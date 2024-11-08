import express from "express";
import {
  signupController,
  loginController,
  getAuthenticatedUserController,
} from "../controllers/authController.js";
import { validateSignup } from "../middlewares/validateSignup.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

// Create a new user (POST): api/auth/signup
router.post("/signup", validateSignup, signupController);

// Login a user (POST): api/auth/login
router.post("/login", validateLogin, loginController);

// Check if a user is currently authenticated and return user data (GET): api/auth/me
router.get("/me", authenticateUser, getAuthenticatedUserController);

export default router;
