import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

// Create a new user (POST): /api/users/signup
router.route("/signup").post(signup);

export default router;
