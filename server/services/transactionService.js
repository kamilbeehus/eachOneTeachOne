import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { UserNotFoundError, ValidationError } from "../errors/customErrors.js";

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
