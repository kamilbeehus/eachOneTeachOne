import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
