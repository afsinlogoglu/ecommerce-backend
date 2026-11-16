import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, describe, it } from "node:test";
import express from "express";
import { createCacheMiddleware } from "./cache.middleware";
import { redisService } from "../services/redis.service";

after(() => {
  (redisService as unknown as { redis: { disconnect: () => void } }).redis.disconnect();
});

function memoryCache() {
  const values = new Map<string, string>();
  return {
    values,
    async get(key: string): Promise<string | null> {
      return values.get(key) ?? null;
    },
    async set(key: string, value: string, _ttl?: number): Promise<void> {
      values.set(key, value);
    },
  };
}

async function withApp(app: express.Express, run: (baseUrl: string) => Promise<void>) {
  const server = createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });
  try {
    const address = server.address();
    if (address === null || typeof address === "string") {
      throw new Error("expected a TCP port");
    }
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe("product response cache", () => {
  it("does not cache a missing product and replay it as HTTP 200", async () => {
    const cache = memoryCache();
    let hits = 0;
    const app = express();
    app.get("/api/products/:id", createCacheMiddleware(cache)("detail"), (_req, res) => {
      hits += 1;
      res.status(404).json({ success: false, error: "Product not found" });
    });

    await withApp(app, async (baseUrl) => {
      const first = await fetch(`${baseUrl}/api/products/missing-id`);
      const second = await fetch(`${baseUrl}/api/products/missing-id`);

      assert.equal(first.status, 404);
      assert.equal(second.status, 404);
      assert.equal(hits, 2);
      assert.equal(cache.values.size, 0);
    });
  });

  it("serves a repeated product read from cache", async () => {
    const cache = memoryCache();
    let hits = 0;
    const app = express();
    app.get("/api/products/:id", createCacheMiddleware(cache)("detail"), (req, res) => {
      hits += 1;
      res.json({ success: true, data: { id: req.params.id, price: 15 } });
    });

    await withApp(app, async (baseUrl) => {
      const first = await fetch(`${baseUrl}/api/products/sku-1`);
      const second = await fetch(`${baseUrl}/api/products/sku-1`);

      assert.equal(first.status, 200);
      assert.equal(second.status, 200);
      assert.equal(hits, 1);
      assert.deepEqual(await second.json(), { success: true, data: { id: "sku-1", price: 15 } });
    });
  });
});
