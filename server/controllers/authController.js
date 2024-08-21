import User from "../models/User.js";
import { generateToken } from "../utils/SecretToken.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, passwordHash } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create a new User with the plain-text password
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash, // Password hashing is handled by the pre-save hook in the User model
    });

    await newUser.save();

    // Generate a JWT token using the user's information
    const token = generateToken(newUser);

    // Return the user information and token
    const userResponse = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      bio: newUser.bio,
      profilePicture: newUser.profilePicture,
      credits: newUser.credits,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token, // Include the token in the response
    });
  } catch (error) {
    console.error("Error during user registration:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.message });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
