import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { UserNotFoundError, ValidationError } from "../errors/customErrors.js";

export const createTransaction = async ({ userId, type, amount, courseId }) => {
  // Validate the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  // Create a new transaction
  const transaction = new Transaction({
    userId,
    type,
    amount,
    courseId,
  });

  await transaction.save();

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

  return transaction;
};
