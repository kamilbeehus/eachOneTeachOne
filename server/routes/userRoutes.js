import express from "express";
import { getUserByIdController } from "../controllers/userController.js";
import { updateUserProfileController } from "../controllers/userController.js";
// import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

// Code has been commented out for development purposes. Uncomment the code to enable user authentication with token.

// Middleware to ensure the user is authenticated before accessing these routes
// router.use(authenticateUser);

// Get a specific user by ID (GET): api/users/:id
router.get("/:id", getUserByIdController);

// Update a user's profile (PATCH): api/users/:id
router.patch("/:id", updateUserProfileController);

export default router;
