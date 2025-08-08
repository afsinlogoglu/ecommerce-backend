import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateProductInput, validateProductUpdate } from "../middlewares/validateProductInput";

const router = Router();

// CRUD operations
router.post("/", validateProductInput, ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/search", ProductController.searchProducts);
router.get("/category/:categoryId", ProductController.getProductsByCategory);
router.get("/:id", ProductController.getProductById);
router.put("/:id", validateProductUpdate, ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router; 