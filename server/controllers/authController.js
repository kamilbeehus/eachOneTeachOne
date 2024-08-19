import User from "../models/User.js";

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
      passwordHash, // This will be encrypted before saving
    });

    await newUser.save();

    // Return the user information, excluding the passwordHash
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

    return res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse });
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
