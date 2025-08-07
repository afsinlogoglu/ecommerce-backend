import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await AuthService.register(name, email, password);
    res.status(201).json(user);
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { token, user } = await AuthService.login(email, password);
    res.json({ token, user });
  }
};
