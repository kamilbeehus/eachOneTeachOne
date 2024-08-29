import { body, validationResult } from "express-validator";
import { ValidationError } from "../errors/customErrors.js";

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required"),

  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }
    next();
  },
];
