import express from "express";
import {
  signupController,
  loginController,
} from "../controllers/authController.js";

const router = express.Router();

// Create a new user (POST): api/auth/signup
router.route("/signup").post(signupController);

// Login user (POST): api/auth/login
router.route("/login").post(loginController);

export default router;
