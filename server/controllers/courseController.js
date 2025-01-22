import { validationResult } from "express-validator";
import {
  createCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  getCoursesByInstructorId,
  getEnrolledStudentsService,
  getCoursesByStudentId,
  updateCourseById,
} from "../services/courseService.js";
import {
  CourseNotFoundError,
  InstructorNotFoundError,
  UserNotFoundError,
  ValidationError,
} from "../errors/customErrors.js";

/** Update course by ID Controller**/
export const updateCourseByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Authenticated user ID
    const updateData = req.body;

    const updatedCourse = await updateCourseById(id, userId, updateData);

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    if (error instanceof CourseNotFoundError || error instanceof ValidationError) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.message === "Unauthorized: You are not the instructor of this course") {
      return res.status(403).json({ success: false, message: error.message });
    }
    next(error);
  }
};

/** Fetch courses by student ID Controller */
export const getCoursesByStudentIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Fetch the courses for the user
    const courses = await getCoursesByStudentId(userId);

    return res.status(200).json({
      success: true,
      message:
        courses.length > 0
          ? "Courses fetched successfully."
          : "No courses found for the user.",
      courses,
    });
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof CourseNotFoundError
    ) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

/** Deletes a course by ID Controller */
export const deleteCourseByIdController = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const result = await deleteCourseById(courseId);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    if (
      error instanceof CourseNotFoundError ||
      error instanceof InstructorNotFoundError
    ) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

/** Fetch enrolled students by course ID Controller */
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

/** Fetch courses by instructor ID Controller */
export const getCoursesByInstructorIdController = async (req, res, next) => {
  try {
    const { instructorId } = req.params;

    const courses = await getCoursesByInstructorId(instructorId);

    return res.status(200).json({
      success: true,
      message:
        courses.length > 0
          ? "Courses fetched successfully."
          : "No courses found for the instructor.",
      courses,
    });
  } catch (error) {
    if (error instanceof InstructorNotFoundError) {
      return res.status(400).json({ success: false, message: error.message });
    } else if (
      error instanceof CourseNotFoundError ||
      error instanceof ValidationError
    ) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

/** Fetch course by ID Controller */
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

/** Fetch all courses Controller */
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

/** Create new course Controller */
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
