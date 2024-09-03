import express from "express";
import { createTransactionController } from "../controllers/transactionController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { validateTransaction } from "../middlewares/validateTransaction.js";

const router = express.Router();

// All routes in this router require the user to be authenticated
router.use(authenticateUser);

// Create a new transaction (POST): api/transactions/create
router.post("/create", validateTransaction, createTransactionController);

export default router;
