import { Request, Response, NextFunction } from 'express';

export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

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

  // Password validation
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters long'
    });
  }

  next();
};

export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Email validation
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Valid email is required'
    });
  }

  // Password validation
  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Password is required'
    });
  }

  next();
}; 