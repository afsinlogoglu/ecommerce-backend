import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  sku: string;
  categoryId?: string;
  stock?: number;
  isActive?: boolean;
  images?: string[];
  tags?: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  sku?: string;
  categoryId?: string;
  stock?: number;
  isActive?: boolean;
  images?: string[];
  tags?: string[];
}

export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  sku: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
  stock: number;
  isActive: boolean;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class ProductService {
  static async createProduct(data: CreateProductData): Promise<ProductResponse> {
    try {
      const product = await prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          sku: data.sku,
          categoryId: data.categoryId,
          stock: data.stock || 0,
          isActive: data.isActive ?? true,
          images: data.images || [],
          tags: data.tags || []
        },
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return product;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Product with this SKU already exists');
        }
      }
      if (error instanceof Error) {
        throw new Error(`Failed to create product: ${error.message}`);
      }
      throw new Error('Failed to create product');
    }
  }

  static async getProductById(id: string): Promise<ProductResponse | null> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return product;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get product: ${error.message}`);
      }
      throw new Error('Failed to get product');
    }
  }

  static async getAllProducts(): Promise<ProductResponse[]> {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get products: ${error.message}`);
      }
      throw new Error('Failed to get products');
    }
  }

  static async updateProduct(id: string, data: UpdateProductData): Promise<ProductResponse> {
    try {
      const product = await prisma.product.update({
        where: { id },
        data,
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return product;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Product not found');
        }
        if (error.code === 'P2002') {
          throw new Error('Product with this SKU already exists');
        }
      }
      if (error instanceof Error) {
        throw new Error(`Failed to update product: ${error.message}`);
      }
      throw new Error('Failed to update product');
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      await prisma.product.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Product not found');
        }
      }
      if (error instanceof Error) {
        throw new Error(`Failed to delete product: ${error.message}`);
      }
      throw new Error('Failed to delete product');
    }
  }

  static async searchProducts(query: string): Promise<ProductResponse[]> {
    try {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { sku: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to search products: ${error.message}`);
      }
      throw new Error('Failed to search products');
    }
  }

  static async getProductsByCategory(categoryId: string): Promise<ProductResponse[]> {
    try {
      const products = await prisma.product.findMany({
        where: { categoryId },
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get products by category: ${error.message}`);
      }
      throw new Error('Failed to get products by category');
    }
  }
} 