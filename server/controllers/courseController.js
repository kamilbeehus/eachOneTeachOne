import { validationResult } from "express-validator";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  getCoursesByInstructorId,
  getEnrolledStudentsService,
} from "../services/courseService.js";
import {
  CourseNotFoundError,
  InstructorNotFoundError,
} from "../errors/customErrors.js";

// Fetch enrolled students by course ID Controller
export const getEnrolledStudentsController = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const students = await getEnrolledStudentsService(courseId);

    return res.status(200).json({
      message: "Enrolled students fetched successfully",
      students,
    });
  } catch (error) {
    if (error instanceof CourseNotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

// Fetch courses by instructor ID Controller
export const getCoursesByInstructorIdController = async (req, res, next) => {
  try {
    const { instructorId } = req.params;

    const courses = await getCoursesByInstructorId(instructorId);

    return res.status(200).json({
      success: true,
      message: "Courses by InstructorId fetched successfully",
      courses,
    });
  } catch (error) {
    if (error instanceof InstructorNotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof CourseNotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

// Fetch course by ID Controller
export const getCourseByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await getCourseById(id);

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    if (error instanceof CourseNotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

// Fetch all courses Controller
export const getAllCoursesController = async (req, res, next) => {
  try {
    const courses = await getAllCourses();
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// Create course Controller
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

    const {
      title,
      description,
      skill,
      creditsCost,
      schedule,
      maxStudents,
      instructorId, // Get the instructor ID directly from the request body
    } = req.body;

    // const instructorId = req.user._id; // Get the instructor ID from the authenticated user

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
