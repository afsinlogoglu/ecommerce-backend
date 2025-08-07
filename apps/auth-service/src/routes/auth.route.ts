import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRegisterInput, validateLoginInput } from "../middlewares/validateAuthInput";

const router = Router();

router.post("/register", validateRegisterInput, AuthController.register);
router.post("/login", validateLoginInput, AuthController.login);

export default router;
