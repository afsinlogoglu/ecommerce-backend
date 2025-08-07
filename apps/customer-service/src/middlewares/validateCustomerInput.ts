import { Request, Response, NextFunction } from 'express';

export const validateCustomerInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, name } = req.body;

  // Email validation
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Valid email is required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Name must be at least 2 characters long'
    });
  }

  // Phone validation (optional)
  if (req.body.phone && typeof req.body.phone !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Phone must be a string'
    });
  }

  next();
}; 