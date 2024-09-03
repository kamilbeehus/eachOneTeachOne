import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { UserNotFoundError, ValidationError } from "../errors/customErrors.js";

export const createTransaction = async ({ userId, type, amount, courseId }) => {
  // Validate the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new UserNotFoundError(`User with ID ${userId} not found`);
  }

  // Handle the transaction creation and user credit updates within a single atomic operation
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create a new transaction
    const transaction = new Transaction({
      userId,
      type,
      amount,
      courseId,
    });

    await transaction.save({ session });
    await user.save({ session });

    // Update User credits based on the transaction type
    if (type === "earned") {
      user.credits += amount;
    } else if (type === "spent") {
      if (user.credits < amount) {
        throw new ValidationError("Insufficient credits");
      }
      user.credits -= amount;
    }

    await user.save();
    await session.commitTransaction();
    session.endSession();

    return transaction;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
