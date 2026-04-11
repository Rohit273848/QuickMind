import express from "express";
import { registerValidation } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.js";
import { register,varifyEmail,login ,getme} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", login)
router.get("/verify-email", varifyEmail);
router.get("/get-me", authUser, getme)

export default router;