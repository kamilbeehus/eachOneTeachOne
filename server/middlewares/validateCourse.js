import { body, validationResult } from "express-validator";
import { ValidationError } from "../errors/customErrors.js";
import { skillsEnum } from "../enums/skillsEnum.js";

// Validate the Course data before creating a new course
export const validateCourse = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 1, max: 30 })
    .withMessage("Title must be between 1 and 30 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ min: 1, max: 200 })
    .withMessage("Description must be between 1 and 200 characters."),

  body("skill")
    .notEmpty()
    .withMessage("Skill is required.")
    .isString()
    .withMessage("Skill must be a string.")
    .isIn(skillsEnum)
    .withMessage(
      `Skill must be one of the following: ${skillsEnum.join(", ")}`
    ),

  body("creditsCost")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Credits cost must be at least 1."),

  body("schedule.startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Start date must be a valid ISO 8601 date.")
    .toDate(),

  body("schedule.endDate")
    .notEmpty()
    .withMessage("End date is required.")
    .isISO8601()
    .withMessage("End date must be a valid ISO 8601 date.")
    .toDate()
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.schedule.startDate)) {
        throw new Error("End date must be after the start date.");
      }
      return true;
    }),

  body("maxStudents")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max students must be at least 1."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(
        errors
          .array()
          .map((error) => error.msg)
          .join(", ")
      );
    }
    next();
  },
];
