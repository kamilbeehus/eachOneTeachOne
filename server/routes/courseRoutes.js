import express from "express";
import {
  getAllCoursesController,
  getCourseByIdController,
  createCourseController,
  getCoursesByInstructorIdController,
} from "../controllers/courseController.js";
import { validateCourse } from "../middlewares/validateCourse.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

// Middleware to ensure the user is authenticated before accessing the routes
router.use(authenticateUser);

// Get all courses by instructor ID (GET): api/courses/:instructorId
router.get("/:instructorId", getCoursesByInstructorIdController);

// Get a specific course by ID (GET): api/courses/:id
router.get("/:id", getCourseByIdController);

// Get all courses (GET): api/courses/
router.get("/", getAllCoursesController);

// Create a new course (POST): api/courses/create
router.post("/create", validateCourse, createCourseController);

export default router;
