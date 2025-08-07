import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export const CustomerController = {
  async register(req: Request, res: Response) {
    const { id } = req.body;
    const user = await CustomerService.getCustomers(id);
    res.status(201).json(user);
  },

};