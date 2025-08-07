import { Request, Response, NextFunction } from "express";

export const validateCustomerInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ message: "Name is required and must be valid" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  next();
};
