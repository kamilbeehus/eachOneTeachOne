import { signupService } from "../services/authService.js";
import { generateToken } from "../utils/SecretToken.js";

export const signup = async (req, res) => {
  try {
    const newUser = await signupService(req.body);
    // Generate a JWT token using the user's information
    const token = generateToken(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      newUser,
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
