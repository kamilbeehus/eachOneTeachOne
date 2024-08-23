import { validationResult } from "express-validator";
import { createCourse } from "../services/courseService.js";

export const createCourseController = async (req, res, next) => {
  try {
    // Input validation using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { title, description, skill, creditsCost, schedule, maxStudents } =
      req.body;
    const instructorId = req.user._id; // Get the instructor ID from the authenticated user

    const course = await createCourse({
      title,
      description,
      skill,
      creditsCost,
      schedule,
      maxStudents,
      instructorId,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    next(error); // Pass unexpected errors to the error handler middleware
  }
};
