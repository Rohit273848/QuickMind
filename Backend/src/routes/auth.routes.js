import express from "express";
import { registerValidation,loginValidation  } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.js";
import { register,varifyEmail,login ,getme,logout} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);
router.post("/login",loginValidation,validate, login)
router.get("/verify-email", varifyEmail);
router.get("/get-me", authUser, getme)
router.post("/logout",logout)

export default router;