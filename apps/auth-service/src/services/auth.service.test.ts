import assert from "node:assert/strict";
import { describe, it } from "node:test";
import bcrypt from "bcrypt";
import { createAuthService } from "./auth.service";

const secret = "test-secret";

function store(passwordHash: string) {
  return {
    async create(args: { data: { email: string; password: string } }) {
      return { id: "user-1", email: args.data.email, password: args.data.password };
    },
    async findUnique() {
      return { id: "user-1", email: "ada@example.com", password: passwordHash };
    },
  };
}

describe("auth login", () => {
  it("signs in with the hash stored on the user record", async () => {
    const hash = await bcrypt.hash("correct-horse", 4);
    const auth = createAuthService(store(hash), secret);
    const result = await auth.login("ada@example.com", "correct-horse");

    assert.equal(result.user.id, "user-1");
    assert.equal(result.user.email, "ada@example.com");
    const payload = auth.verifyToken(result.token);
    assert.equal(typeof payload === "string" ? "" : payload.userId, "user-1");
  });

  it("rejects a password that does not match the stored hash", async () => {
    const hash = await bcrypt.hash("correct-horse", 4);
    const auth = createAuthService(store(hash), secret);

    await assert.rejects(() => auth.login("ada@example.com", "wrong-password"), /Invalid credentials/);
  });

  it("rejects an unknown email", async () => {
    const auth = createAuthService(
      {
        async create() {
          throw new Error("unused");
        },
        async findUnique() {
          return null;
        },
      },
      secret,
    );

    await assert.rejects(() => auth.login("missing@example.com", "correct-horse"), /Invalid credentials/);
  });
});
