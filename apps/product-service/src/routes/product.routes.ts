import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateProductInput, validateProductUpdate } from "../middlewares/validateProductInput";
import { cacheMiddleware } from "../middlewares/cache.middleware";

const router = Router();

// Static paths must be registered before "/:id", or Express treats "search" as an id.
router.get("/", cacheMiddleware('all'), ProductController.getAllProducts);
router.get("/search", cacheMiddleware('search'), ProductController.searchProducts);
router.get("/category/:categoryId", ProductController.getProductsByCategory);
router.get("/:id", cacheMiddleware('detail'), ProductController.getProductById);
router.post("/", validateProductInput, ProductController.createProduct);
router.put("/:id", validateProductUpdate, ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
