import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const ProductController = {
  async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price, sku, categoryId, stock, isActive, images, tags } = req.body;
      const product = await ProductService.createProduct({ 
        name, 
        description, 
        price, 
        sku, 
        categoryId, 
        stock, 
        isActive, 
        images, 
        tags 
      });
      
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create product'
      });
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Product ID is required'
        });
      }

      const product = await ProductService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get product'
      });
    }
  },

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get products'
      });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Product ID is required'
        });
      }

      const { name, description, price, sku, categoryId, stock, isActive, images, tags } = req.body;
      const product = await ProductService.updateProduct(id, { 
        name, 
        description, 
        price, 
        sku, 
        categoryId, 
        stock, 
        isActive, 
        images, 
        tags 
      });
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update product'
      });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Product ID is required'
        });
      }

      await ProductService.deleteProduct(id);
      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete product'
      });
    }
  },

  async searchProducts(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const products = await ProductService.searchProducts(q);
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search products'
      });
    }
  },

  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          error: 'Category ID is required'
        });
      }

      const products = await ProductService.getProductsByCategory(categoryId);
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get products by category'
      });
    }
  }
}; 