import { createTransaction } from "../services/transactionService.js";

export const createTransactionController = async (req, res, next) => {
  try {
    const { userId, type, amount, courseId } = req.body;

    const transaction = await createTransaction({
      userId,
      type,
      amount,
      courseId,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};
