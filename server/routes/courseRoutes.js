import express from "express";
import {
  getAllCoursesController,
  getCourseByIdController,
  createCourseController,
  getCoursesByInstructorIdController,
  getEnrolledStudentsController,
} from "../controllers/courseController.js";
import { enrollUserController } from "../controllers/enrollmentController.js";
import { validateCourse } from "../middlewares/validateCourse.js";
// import { authenticateUser } from "../middlewares/authenticateUser.js";
import { validateEnrollment } from "../middlewares/validateEnrollment.js";

const router = express.Router();

// Code has been commented out for development purposes. Uncomment the code to enable user authentication with token.

// Middleware to ensure the user is authenticated before accessing these routes
// router.use(authenticateUser);

// Get enrolled students in a course by course ID (GET): api/courses/:id/enrolled-students
router.get("/:id/enrolled-students", getEnrolledStudentsController);

// Get all courses by instructor ID (GET): api/courses/instructor/:instructorId
router.get("/instructor/:instructorId", getCoursesByInstructorIdController);

// Get a specific course by ID (GET): api/courses/:id
router.get("/:id", getCourseByIdController);

// Get all courses (GET): api/courses/
router.get("/", getAllCoursesController);

// Create a new course (POST): api/courses/create
router.post("/create", validateCourse, createCourseController);

// Enroll a user in a course (POST): api/courses/enroll
router.post("/enroll", validateEnrollment, enrollUserController);

export default router;
