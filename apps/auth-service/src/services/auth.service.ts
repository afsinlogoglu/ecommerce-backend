import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;

type Credentials = {
  id: string;
  email: string;
  password: string;
};

type UserStore = {
  create(args: { data: { email: string; password: string } }): Promise<Credentials>;
  findUnique(args: { where: { email: string } }): Promise<Credentials | null>;
};

export function createAuthService(users: UserStore, secret: string) {
  return {
    async register(email: string, password: string) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return users.create({
        data: { email, password: hashedPassword },
      });
    },

    async login(email: string, password: string) {
      const user = await users.findUnique({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: "1h",
      });

      return { token, user };
    },

    verifyToken(token: string) {
      return jwt.verify(token, secret);
    },
  };
}

export const AuthService = createAuthService(prisma.user, JWT_SECRET);
