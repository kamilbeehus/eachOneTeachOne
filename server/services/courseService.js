import Course from "../models/Course.js";
import User from "../models/User.js";
import { skillsEnum } from "../enums/skillsEnum.js";
import {
  SkillNotValidError,
  InstructorNotFoundError,
} from "../errors/customErrors.js";

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

const formatCourseResponse = (course) => ({
  _id: course._id,
  title: course.title,
  description: course.description,
  instructorId: course.instructorId,
  skill: course.skill,
  creditsCost: course.creditsCost,
  schedule: course.schedule,
  maxStudents: course.maxStudents,
  enrolledStudents: course.enrolledStudents,
  createdAt: course.createdAt,
});
