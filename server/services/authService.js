import User from "../models/User.js";
import { generateToken } from "../utils/SecretToken.js";
import {
  EmailAlreadyInUseError,
  AuthenticationError,
  ValidationError,
} from "../errors/customErrors.js";

export const signup = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new ValidationError("All fields are required for signup.");
  }
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new EmailAlreadyInUseError();
  }

  // Create a new User instance
  const user = new User({
    firstName,
    lastName,
    email,
    password, // Password hashing should be handled by the User model
  });

  // Save the user to the database
  await user.save();

  // Generate a JWT token with the user's information
  const token = generateToken(user);

  return { user: formatUserResponse(user), token };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new ValidationError("All fields are required for login.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError();
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AuthenticationError();
  }

  const token = generateToken(user);

  return { user: formatUserResponse(user), token };
};

// Utility function to format user response
const formatUserResponse = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  bio: user.bio,
  profilePicture: user.profilePicture,
  credits: user.credits,
  createdAt: user.createdAt,
});
