import User from "../models/User.js";
import { UserNotFoundError } from "../errors/customErrors.js";
import { formatUserByIdResponse } from "../utils/userUtils.js";

// Get a specific User by their id and return a formatted response
export const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new UserNotFoundError(`User with id ${userId} not found`);
  }

  // Format the user response
  return formatUserByIdResponse(user);
};
