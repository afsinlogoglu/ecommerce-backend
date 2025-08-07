import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";
import { validateCustomerInput } from "../middlewares/validateCustomerInput";

const router = Router();

// CRUD operations
router.post("/", validateCustomerInput, CustomerController.createCustomer);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.put("/:id", validateCustomerInput, CustomerController.updateCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

export default router;
