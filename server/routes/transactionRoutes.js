import express from "express";
import { getTransactionHistoryController } from "../controllers/transactionController.js";
// import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

// Code has been commented out for development purposes. Uncomment the code to enable user authentication with token.

// All routes in this router require the user to be authenticated
// router.use(authenticateUser);

// Get transaction history for a specific user by userId (GET): api/transactions/user/:userId
router.get("/user/:userId", getTransactionHistoryController);

export default router;
