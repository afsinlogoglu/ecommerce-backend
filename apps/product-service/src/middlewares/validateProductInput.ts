import { Request, Response, NextFunction } from 'express';

export const validateProductInput = (req: Request, res: Response, next: NextFunction) => {
  // Check if body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Request body is required'
    });
  }

  const { name, price, sku } = req.body;

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Product name must be at least 2 characters long'
    });
  }

  // Price validation
  if (!price || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Valid price is required (must be a positive number)'
    });
  }

  // SKU validation
  if (!sku || typeof sku !== 'string' || sku.trim().length < 3) {
    return res.status(400).json({
      success: false,
      error: 'SKU must be at least 3 characters long'
    });
  }

  // Description validation (optional)
  if (req.body.description && typeof req.body.description !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Description must be a string'
    });
  }

  // Stock validation (optional)
  if (req.body.stock !== undefined) {
    if (typeof req.body.stock !== 'number' || req.body.stock < 0) {
      return res.status(400).json({
        success: false,
        error: 'Stock must be a non-negative number'
      });
    }
  }

  // Images validation (optional)
  if (req.body.images && !Array.isArray(req.body.images)) {
    return res.status(400).json({
      success: false,
      error: 'Images must be an array'
    });
  }

  // Tags validation (optional)
  if (req.body.tags && !Array.isArray(req.body.tags)) {
    return res.status(400).json({
      success: false,
      error: 'Tags must be an array'
    });
  }

  next();
};

export const validateProductUpdate = (req: Request, res: Response, next: NextFunction) => {
  // Check if body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Request body is required'
    });
  }

  const { name, price, sku, description, stock, images, tags } = req.body;

  // At least one field should be provided for update
  if (!name && !price && !sku && !description && stock === undefined && !images && !tags) {
    return res.status(400).json({
      success: false,
      error: 'At least one field is required for update'
    });
  }

  // Name validation (if provided)
  if (name && (typeof name !== 'string' || name.trim().length < 2)) {
    return res.status(400).json({
      success: false,
      error: 'Product name must be at least 2 characters long'
    });
  }

  // Price validation (if provided)
  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    return res.status(400).json({
      success: false,
      error: 'Price must be a positive number'
    });
  }

  // SKU validation (if provided)
  if (sku && (typeof sku !== 'string' || sku.trim().length < 3)) {
    return res.status(400).json({
      success: false,
      error: 'SKU must be at least 3 characters long'
    });
  }

  // Description validation (if provided)
  if (description && typeof description !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Description must be a string'
    });
  }

  // Stock validation (if provided)
  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    return res.status(400).json({
      success: false,
      error: 'Stock must be a non-negative number'
    });
  }

  // Images validation (if provided)
  if (images && !Array.isArray(images)) {
    return res.status(400).json({
      success: false,
      error: 'Images must be an array'
    });
  }

  // Tags validation (if provided)
  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({
      success: false,
      error: 'Tags must be an array'
    });
  }

  next();
}; 