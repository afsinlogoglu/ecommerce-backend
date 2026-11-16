import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, describe, it } from "node:test";
import express from "express";
import productRouter from "./product.routes";
import { redisService } from "../services/redis.service";

type RouteLayer = {
  route?: {
    path?: string;
    methods?: Record<string, boolean>;
  };
};

after(() => {
  (redisService as unknown as { redis: { disconnect: () => void } }).redis.disconnect();
});

function getPaths(): string[] {
  return (productRouter as unknown as { stack: RouteLayer[] }).stack
    .filter((layer) => layer.route?.methods?.get === true && typeof layer.route.path === "string")
    .map((layer) => layer.route?.path)
    .filter((path): path is string => typeof path === "string");
}

describe("product routes", () => {
  it("registers /search before /:id and Express matches search", async () => {
    const gets = getPaths();
    const searchAt = gets.indexOf("/search");
    const idAt = gets.indexOf("/:id");

    assert.ok(searchAt >= 0, "GET /search is registered");
    assert.ok(idAt >= 0, "GET /:id is registered");
    assert.ok(searchAt < idAt, "GET /search must be registered before GET /:id");

    const app = express();
    for (const path of gets) {
      app.get(path, (_req, res) => {
        res.json({ matched: path });
      });
    }

    const server = createServer(app);
    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    try {
      const address = server.address();
      if (address === null || typeof address === "string") {
        throw new Error("expected a TCP port");
      }
      const response = await fetch(`http://127.0.0.1:${address.port}/search?q=shoes`);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { matched: "/search" });
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    }
  });
});
