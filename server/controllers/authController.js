import { signup, login } from "../services/authService.js";
import {
  EmailAlreadyInUseError,
  AuthenticationError,
  ValidationError,
} from "../errors/customErrors.js";

export const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new ValidationError("All required fields must be provided.");
    }

    // Call the signup service to create a new user and generate a token
    const { user, token } = await signup({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token, // Include the token in the response
    });
  } catch (error) {
    if (error instanceof EmailAlreadyInUseError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("All required fields must be provided.");
    }

    // Call the login service to authenticate the user and generate a token
    const { user, token } = await login({ email, password });

    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
