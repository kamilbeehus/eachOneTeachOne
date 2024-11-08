import {
  signup,
  login,
  getAuthenticatedUserData,
} from "../services/authService.js";
import {
  EmailAlreadyInUseError,
  AuthenticationError,
  ValidationError,
} from "../errors/customErrors.js";

/** Signup Controller */
export const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Call the signup service to create a new user and generate a token
    const { user, token } = await signup({
      firstName,
      lastName,
      email,
      password,
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // TODO: Set to true once we use HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for the development phase
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
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

/** Login Controller */
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the login service to authenticate the user and generate a token
    const { token } = await login({ email, password });

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // TODO: Set to true once we use HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for the development phase
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
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

/** Returns the authenticated user's relevat data. By this point, authenticateUser middleware has already validated the token
 * and attached the user to req.user, so we can safely return the user data. */
export const getAuthenticatedUserController = (req, res) => {
  try {
    const userData = getAuthenticatedUserData(req.user);
    res.json({ user: userData });
  } catch (error) {
    console.error("Get authenticated user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
