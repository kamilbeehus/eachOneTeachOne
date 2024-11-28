import { enrollUserInCourse } from "../services/enrollmentService.js";
import { validationResult } from "express-validator";

/** Enroll User in a Course Controller */
export const enrollUserController = async (req, res, next) => {
  // Input validation using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { userId, courseId } = req.body;

  try {
    const enrollment = await enrollUserInCourse(userId, courseId);
    res.status(201).json({
      success: true,
      message: "User enrolled in course successfully",
      enrollment,
    });
  } catch (error) {
    next(error);
  }
};
