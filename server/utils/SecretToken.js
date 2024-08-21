import jwt from "jsonwebtoken";

// Generates a JWT token for a given user
export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
