import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export const CustomerController = {
  async createCustomer(req: Request, res: Response) {
    try {
      const { email, name, phone } = req.body;
      const customer = await CustomerService.createCustomer({ email, name, phone });
      res.status(201).json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create customer'
      });
    }
  },

  async getCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Customer ID is required'
        });
      }

      const customer = await CustomerService.getCustomerById(id);
      
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }

      res.json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get customer'
      });
    }
  },

  async getAllCustomers(req: Request, res: Response) {
    try {
      const customers = await CustomerService.getAllCustomers();
      res.json({
        success: true,
        data: customers
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get customers'
      });
    }
  },

  async updateCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Customer ID is required'
        });
      }

      const { email, name, phone } = req.body;

      const customer = await CustomerService.updateCustomer(id, { email, name, phone });
      res.json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update customer'
      });
    }
  },

  async deleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(req.params);
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Customer ID is required'
        });
      }

      await CustomerService.deleteCustomer(id);
      res.json({
        success: true,
        message: 'Customer deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete customer'
      });
    }
  }
};