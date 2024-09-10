import { check, validationResult } from "express-validator";
import mongoose from "mongoose";
import User from "../models/User.js";
import Course from "../models/Course.js";

// Validate the Transaction data before creating a new transaction
export const validateTransaction = [
  // Check if userId is provided and is a valid MongoDB ObjectId
  check("userId")
    .notEmpty()
    .withMessage("User ID is required.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid User ID format.")
    .bail()
    .custom(async (userId) => {
      const user = await User.findById(userId);
      if (!user) {
        return Promise.reject("User not found.");
      }
    }),

  // Check if type is either 'earned' or 'spent'
  check("type")
    .notEmpty()
    .withMessage("Transaction type is required.")
    .isIn(["earned", "spent"])
    .withMessage('Transaction type must be either "earned" or "spent".'),

  // Check if amount is provided and is a non-negative number
  check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a non-negative number."),

  check("courseId")
    .notEmpty()
    .withMessage("Course ID is required.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Course ID format.")
    .bail()
    .custom(async (courseId) => {
      const course = await Course.findById(courseId);
      if (!course) {
        return Promise.reject("Course not found.");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
