import User from "../models/User.js";
import { getUserById } from "../services/userService.js";
import { updateUserProfile } from "../services/userService.js";
import { ValidationError, UserNotFoundError } from "../errors/customErrors.js";

/** Fetch User by ID Controller */
export const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate the userId format (e.g., valid MongoDB ObjectId)
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ValidationError("Invalid user ID format");
    }

    // Check if the authenticated user is requesting their own profile
    // req.user.id is the ID of the authenticated user,
    // accessible in any route or controller that follows the middleware in the request lifecycle.
    // if (req.user.id !== userId) {
    //   return res.status(403).json({
    //     message: "Forbidden: User is not authorized to view this profile",
    //   });
    // }

    const user = await getUserById(userId);

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/** Update User Profile Controller */
export const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bio, profilePicture } = req.body;

    // Validate the userId format (e.g., valid MongoDB ObjectId)
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ValidationError("Invalid user ID format");
    }

    // Check if the authenticated user is requesting to update their own profile
    // req.user.id is the ID of the authenticated user,
    // accessible in any route or controller that follows the middleware in the request lifecycle.
    // if (req.user.id !== userId) {
    //   return res.status(403).json({
    //     message: "Forbidden: User is not authorized to update this profile",
    //   });
    // }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile
    const updatedUser = await updateUserProfile(userId, req.body);

    return res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
