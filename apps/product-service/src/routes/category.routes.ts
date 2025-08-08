import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { validateCategoryInput, validateCategoryUpdate } from "../middlewares/validateCategoryInput";

const router = Router();

// CRUD operations
router.post("/", validateCategoryInput, CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", validateCategoryUpdate, CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router; 