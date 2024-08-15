import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

// Create a new user (POST): /api/users/signup
router.route("/signup").post(registerUser);

export default router;
