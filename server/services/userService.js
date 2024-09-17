import User from "../models/User.js";
import { UserNotFoundError, ValidationError } from "../errors/customErrors.js";
import { formatUserByIdResponse } from "../utils/userUtils.js";

/** Get a specific User by their id and return a formatted response */
export const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new UserNotFoundError(`User with id ${userId} not found`);
  }

  // Format the user response
  return formatUserByIdResponse(user);
};

/** Update a user's profile allowing them to update their bio and profile picture */
export const updateUserProfile = async (userId, updates) => {
  const allowedUpdates = ["bio", "profilePicture"];

  // Check for invalid updates
  const invalidUpdates = Object.keys(updates).filter(
    (key) => !allowedUpdates.includes(key)
  );
  if (invalidUpdates.length) {
    throw new ValidationError(
      `Invalid update fields: ${invalidUpdates.join(", ")}`
    );
  }

  // Update the user profile
  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new UserNotFoundError(`User with id ${userId} not found`);
  }

  return user;
};
