import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateCategoryData {
  name: string;
  description?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryService {
  static async createCategory(data: CreateCategoryData): Promise<CategoryResponse> {
    try {
      const category = await prisma.category.create({
        data: {
          name: data.name,
          description: data.description
        }
      });

      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Category with this name already exists');
        }
      }
      if (error instanceof Error) {
        throw new Error(`Failed to create category: ${error.message}`);
      }
      throw new Error('Failed to create category');
    }
  }

  static async getCategoryById(id: string): Promise<CategoryResponse | null> {
    try {
      const category = await prisma.category.findUnique({
        where: { id }
      });

      return category;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get category: ${error.message}`);
      }
      throw new Error('Failed to get category');
    }
  }

  static async getAllCategories(): Promise<CategoryResponse[]> {
    try {
      const categories = await prisma.category.findMany({
        orderBy: {
          name: 'asc'
        }
      });

      return categories;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get categories: ${error.message}`);
      }
      throw new Error('Failed to get categories');
    }
  }

  static async updateCategory(id: string, data: UpdateCategoryData): Promise<CategoryResponse> {
    try {
      const category = await prisma.category.update({
        where: { id },
        data
      });

      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Category not found');
        }
        if (error.code === 'P2002') {
          throw new Error('Category with this name already exists');
        }
      }
      if (error instanceof Error) {
        throw new Error(`Failed to update category: ${error.message}`);
      }
      throw new Error('Failed to update category');
    }
  }

  static async deleteCategory(id: string): Promise<void> {
    try {
      await prisma.category.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Category not found');
        }
      }
      if (error instanceof Error) {
        throw new Error(`Failed to delete category: ${error.message}`);
      }
      throw new Error('Failed to delete category');
    }
  }
} 