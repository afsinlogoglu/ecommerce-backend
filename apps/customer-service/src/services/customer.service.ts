import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateCustomerData {
  email: string;
  name: string;
  phone?: string | null;
}

export interface CustomerResponse {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class CustomerService {
  static async createCustomer(data: CreateCustomerData): Promise<CustomerResponse> {
    try {
      const customer = await prisma.customer.create({
        data: {
          email: data.email,
          name: data.name,
          phone: data.phone || null
        }
      });

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create customer: ${error.message}`);
      }
      throw new Error('Failed to create customer');
    }
  }

  static async getCustomerById(id: string): Promise<CustomerResponse | null> {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id }
      });

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get customer: ${error.message}`);
      }
      throw new Error('Failed to get customer');
    }
  }

  static async getAllCustomers(): Promise<CustomerResponse[]> {
    try {
      const customers = await prisma.customer.findMany();
      return customers;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get customers: ${error.message}`);
      }
      throw new Error('Failed to get customers');
    }
  }

  static async updateCustomer(id: string, data: Partial<CreateCustomerData>): Promise<CustomerResponse> {
    try {
      const customer = await prisma.customer.update({
        where: { id },
        data
      });

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update customer: ${error.message}`);
      }
      throw new Error('Failed to update customer');
    }
  }

  static async deleteCustomer(id: string): Promise<void> {
    try {
      await prisma.customer.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete customer: ${error.message}`);
      }
      throw new Error('Failed to delete customer');
    }
  }
}