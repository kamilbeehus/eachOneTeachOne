import express from "express";
import { getUserByIdController } from "../controllers/userController.js";
// import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

// router.use(authenticateUser);

// Get a specific user by ID (GET): api/users/:id
router.get("/:id", getUserByIdController);

export default router;
