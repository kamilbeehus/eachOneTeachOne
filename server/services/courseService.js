import Course from "../models/Course.js";
import User from "../models/User.js";
import { skillsEnum } from "../enums/skillsEnum.js";
import {
  SkillNotValidError,
  InstructorNotFoundError,
  CourseNotFoundError,
} from "../errors/customErrors.js";
import { formatCourseResponse } from "../utils/courseUtils.js";
import { createTransaction } from "../services/transactionService.js";
import mongoose from "mongoose";

// Fetch enrolled students by course ID and populates student details (firstName and lastName)
export const getEnrolledStudentsService = async (courseId) => {
  const course = await Course.findById(courseId).populate(
    "enrolledStudents",
    "firstName lastName"
  );

  if (!course) {
    throw new CourseNotFoundError(`Course with id ${courseId} not found`);
  }

  return course.enrolledStudents;
};

// Fetch courses by instructor ID and populates instructor details (firstName and lastName)
export const getCoursesByInstructorId = async (instructorId) => {
  if (!instructorId) {
    throw new InstructorNotFoundError();
  } else if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    throw new InstructorNotFoundError();
  }

  try {
    const courses = await Course.find({ instructorId }).populate(
      "instructorId",
      "firstName lastName"
    );

    if (!courses.length) {
      throw new CourseNotFoundError();
    }
    return courses.map(formatCourseResponse);
  } catch (error) {
    console.error("Error fetching courses by instructor ID:", error);
    throw new Error("Error fetching courses by instructor ID.");
  }
};

// Fetch an individual course by its ID and populate instructor details (firstName and lastName)
export const getCourseById = async (id) => {
  try {
    const course = await Course.findById(id).populate(
      "instructorId",
      "firstName lastName"
    );

    if (!course) {
      throw new CourseNotFoundError();
    }

    return formatCourseResponse(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// Fetch all courses and populate instructor details (firstName and lastName)
export const getAllCourses = async () => {
  try {
    const courses = await Course.find().populate(
      "instructorId",
      "firstName lastName"
    );

    return courses.map(formatCourseResponse);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Error fetching courses.");
  }
};

// Create a new course and save it to the database
export const createCourse = async (courseData) => {
  try {
    if (!skillsEnum.includes(courseData.skill)) {
      throw new SkillNotValidError();
    }

    const instructor = await User.findById(courseData.instructorId);
    if (!instructor) {
      throw new InstructorNotFoundError();
    }

    const course = new Course({ ...courseData });
    await course.save();

    // Calculate credits earned from the created course
    const earnedCredits = course.creditsCost;

    // Create a transaction for the User who created the course
    await createTransaction({
      userId: courseData.instructorId,
      type: "earned",
      amount: earnedCredits,
      courseId: course._id,
    });

    return formatCourseResponse(course);
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Error creating course.");
  }
};
