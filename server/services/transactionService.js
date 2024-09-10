import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import {
  TransactionHistoryNotFoundError,
  UserNotFoundError,
  ValidationError,
} from "../errors/customErrors.js";
import { formatTransactionResponse } from "../utils/transactionUtils.js";

// Fetch the transaction history with all 'spent' and 'earned' credits for a User
export const getTransactionHistoryByUserId = async (userId) => {
  if (!userId) {
    throw new UserNotFoundError();
  } else if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ValidationError("Invalid user ID");
  }

  try {
    const transactions = await Transaction.find({ userId })
      .populate("userId", "firstName lastName") // Populate first and last name of the user
      .populate("courseId", "title") // Populate the title of the course
      .sort({ transactionDate: -1 }); // Sort by transactionDate in descending order

    if (!transactions.length) {
      throw new TransactionHistoryNotFoundError();
    }
    return transactions.map(formatTransactionResponse);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw new Error("Error fetching transaction history.");
  }
};

// Create a new transaction and update the User's credits
export const createTransaction = async (
  { userId, type, amount, courseId },
  session = null
) => {
  // If no session is passed, start a new session
  const newSession = session || (await mongoose.startSession());

  // Start a transaction only if a session was not provided
  let transactionStarted = false;
  if (!session) {
    newSession.startTransaction();
    transactionStarted = true;
  }

  try {
    // Validate the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new UserNotFoundError(`User with ID ${userId} not found`);
    }

    // Create a new transaction
    const transaction = new Transaction({
      userId,
      type,
      amount,
      courseId,
    });

    // Update User credits based on the transaction type
    if (type === "earned") {
      user.credits += amount;
    } else if (type === "spent") {
      if (user.credits < amount) {
        throw new ValidationError("Insufficient credits");
      }
      user.credits -= amount;
    }

    // Save the transaction and update the User in the same session
    await transaction.save({ session: newSession });
    await user.save({ session: newSession });

    if (transactionStarted) {
      await newSession.commitTransaction();
    }
    return transaction;
  } catch (error) {
    // Abort the transaction only if this method started it
    if (transactionStarted) {
      await newSession.abortTransaction();
    }
    throw error;
  } finally {
    // End the session only if this method started it
    if (transactionStarted) {
      newSession.endSession();
    }
  }
};
