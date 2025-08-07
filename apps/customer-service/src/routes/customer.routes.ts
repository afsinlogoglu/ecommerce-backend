import { Router } from "express";
import { createCustomer } from "../controllers/customer.controller";
import { validateCustomerInput } from "../middlewares/validateCustomerInput";

const router = Router();

router.post("/", validateCustomerInput, createCustomer);

export default router;
