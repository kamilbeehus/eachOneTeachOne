import User from "../models/User.js";

export const signupService = async ({
  firstName,
  lastName,
  email,
  passwordHash,
}) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use.");
  }

  // Create a new User instance
  const newUser = new User({
    firstName,
    lastName,
    email,
    passwordHash, // Password hashing should be handled by the User model
  });

  // Save the new user to the database
  await newUser.save();

  // Prepare the user response object
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

  return userResponse;
};
