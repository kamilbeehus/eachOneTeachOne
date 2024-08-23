import express from "express";
import { createCourseController } from "../controllers/courseController.js";
import { validateCourse } from "../middlewares/validateCourse.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

// Middleware to ensure the user is authenticated
router.use(authenticateUser);

// Create a new course (POST): api/courses/create
router.post("/create", validateCourse, createCourseController);

export default router;
