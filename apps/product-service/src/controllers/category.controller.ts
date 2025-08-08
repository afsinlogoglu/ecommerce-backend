import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export const CategoryController = {
  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const category = await CategoryService.createCategory({ name, description });
      
      res.status(201).json({
        success: true,
        data: category
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create category'
      });
    }
  },

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Category ID is required'
        });
      }

      const category = await CategoryService.getCategoryById(id);
      
      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Category not found'
        });
      }

      res.json({
        success: true,
        data: category
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get category'
      });
    }
  },

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get categories'
      });
    }
  },

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Category ID is required'
        });
      }

      const { name, description } = req.body;
      const category = await CategoryService.updateCategory(id, { name, description });
      
      res.json({
        success: true,
        data: category
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update category'
      });
    }
  },

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Category ID is required'
        });
      }

      await CategoryService.deleteCategory(id);
      res.json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete category'
      });
    }
  }
}; 