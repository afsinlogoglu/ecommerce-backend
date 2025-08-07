import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.register(email, password);
      
      // Don't send password in response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({
        success: true,
        data: userWithoutPassword
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to register user'
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      
      // Don't send password in response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        success: true,
        data: {
          token,
          user: userWithoutPassword
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Invalid credentials'
      });
    }
  }
};
