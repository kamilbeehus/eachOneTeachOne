import Course from "../models/Course.js";
import User from "../models/User.js";
import { skillsEnum } from "../enums/skillsEnum.js";
import {
  SkillNotValidError,
  InstructorNotFoundError,
  CourseNotFoundError,
} from "../errors/customErrors.js";
import { formatCourseResponse } from "../utils/courseUtils.js";

export const getCourseById = async (id) => {
  try {
    // Fetch an individual course by its ID and populate instructor details (firstName and lastName)
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

export const getAllCourses = async () => {
  try {
    // Fetch courses and populate instructor details (firstName and lastName)
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

    return formatCourseResponse(course);
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Error creating course.");
  }
};
