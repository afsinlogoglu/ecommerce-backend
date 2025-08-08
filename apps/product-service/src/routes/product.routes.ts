import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateProductInput, validateProductUpdate } from "../middlewares/validateProductInput";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const router = Router();

// Cache'li route'lar
router.get("/", cacheMiddleware('all'), ProductController.getAllProducts);
router.get("/:id", cacheMiddleware('detail'), ProductController.getProductById);
router.get("/search", cacheMiddleware('search'), ProductController.searchProducts)
// CRUD operations
router.post("/", validateProductInput, ProductController.createProduct);
router.get("/category/:categoryId", ProductController.getProductsByCategory);
router.put("/:id", validateProductUpdate, ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router; 