import { Request, Response, NextFunction } from 'express';

export const validateCategoryInput = (req: Request, res: Response, next: NextFunction) => {
  // Check if body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Request body is required'
    });
  }

  const { name } = req.body;

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Category name must be at least 2 characters long'
    });
  }

  // Description validation (optional)
  if (req.body.description && typeof req.body.description !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Description must be a string'
    });
  }

  next();
};

export const validateCategoryUpdate = (req: Request, res: Response, next: NextFunction) => {
  // Check if body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Request body is required'
    });
  }

  const { name, description } = req.body;

  // At least one field should be provided for update
  if (!name && !description) {
    return res.status(400).json({
      success: false,
      error: 'At least one field (name or description) is required for update'
    });
  }

  // Name validation (if provided)
  if (name && (typeof name !== 'string' || name.trim().length < 2)) {
    return res.status(400).json({
      success: false,
      error: 'Category name must be at least 2 characters long'
    });
  }

  // Description validation (if provided)
  if (description && typeof description !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Description must be a string'
    });
  }

  next();
}; 