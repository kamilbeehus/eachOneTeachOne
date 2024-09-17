import { getTransactionHistoryByUserId } from "../services/transactionService.js";
import {
  UserNotFoundError,
  TransactionHistoryNotFoundError,
} from "../errors/customErrors.js";

/** Get transaction history for a user by user ID Controller */
export const getTransactionHistoryController = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const transactions = await getTransactionHistoryByUserId(userId);

    return res.status(200).json({
      success: true,
      message: "Transaction history fetched successfully",
      transactions,
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof TransactionHistoryNotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};
