import express from "express";
import {
  signupController,
  loginController,
} from "../controllers/authController.js";
import { validateSignup } from "../middlewares/validateSignup.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const router = express.Router();

// Create a new user (POST): api/auth/signup
router.post("/signup", validateSignup, signupController);

// Login a user (POST): api/auth/login
router.post("/login", validateLogin, loginController);

export default router;
