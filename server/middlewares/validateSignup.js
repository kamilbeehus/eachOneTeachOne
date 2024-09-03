import { body, validationResult } from "express-validator";
import { ValidationError } from "../errors/customErrors.js";

export const validateSignup = [
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("First name must be between 2 and 20 characters")
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name must be between 1 and 20 characters")
    .notEmpty()
    .withMessage("Last name is required"),

  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .notEmpty()
    .withMessage("Password is required"),

  // Optional validation for bio and profilePicture, as they have default values
  body("bio").optional().isString().withMessage("Bio must be a string"),

  body("profilePicture")
    .optional()
    .isURL()
    .withMessage("Profile picture must be a valid URL"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }
    next();
  },
];
