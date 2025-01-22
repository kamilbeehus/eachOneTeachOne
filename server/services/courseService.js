import mongoose from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import Transaction from "../models/Transaction.js";
import { skillsEnum } from "../enums/skillsEnum.js";
import {
  SkillNotValidError,
  InstructorNotFoundError,
  CourseNotFoundError,
  ValidationError,
  UserNotFoundError,
} from "../errors/customErrors.js";
import { formatCourseResponse } from "../utils/courseUtils.js";
import { createTransaction } from "../services/transactionService.js";

/** Update the data of a Course by its ID */
export const updateCourseById = async (courseId, userId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ValidationError("Invalidad course ID");
  }

  try {
    // Find the course and ensure the user is the instructor
    const course = await Course.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(`Course with id ${courseId} not found`);
    }

    if (!course.instructorId.equals(userId)) {
      throw new Error("Unauthorized: You are not the instructor of this course");
    }

    // Update only the fields present in updateData
    if (updateData.description !== undefined) {
      course.description = updateData.description;
    }

    if (updateData.schedule) {
      const { startDate, endDate } = updateData.schedule;
      if (startDate && endDate) {
        if (new Date(endDate) <= new Date(startDate)) {
          throw new ValidationError("End date must be after start date");
        }
        course.schedule = updateData.schedule;
      } else {
        throw new ValidationError("Both startDate and endDate are required for schedule");
      }
    }

    if (updateData.maxStudents !== undefined) {
      if (updateData.maxStudents < 1) {
        throw new ValidationError("maxStudents must be at least 1");
      }
      course.maxStudents = updateData.maxStudents;
    }

    // Save changes to the database
    await course.save();
    return course;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

/** Get all courses where the given user is enrolled as a Student */
export const getCoursesByStudentId = async (userId) => {
  if (!userId) {
    throw new UserNotFoundError("User ID is required.");
  }

  try {
    // Find all courses where the user is enrolled
    const courses = await Course.find({ enrolledStudents: userId }).populate(
      "instructorId",
      "firstName lastName"
    );

    // Return an empty array if no courses are found
    return courses.length > 0 ? courses.map(formatCourseResponse) : [];
  } catch (error) {
    console.error("Unexpected error fetching courses by student ID:", error);
    throw new Error("Error fetching courses by student ID.");
  }
};

/** Delete a course by its ID and update related collections from database (user, transaction, enrollment) */
export const deleteCourseById = async (courseId) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // Start a new transaction to ensure data consistency across multiple collections

  try {
    // Fetch the course by its ID
    const course = await Course.findById(courseId).session(session);
    if (!course) {
      throw new CourseNotFoundError(`Course with id ${courseId} not found`);
    }

    // Find all enrolled students for the course
    const enrolledStudents = course.enrolledStudents;

    // Refund credits to each enrolled student for the course
    if (enrolledStudents.length > 0) {
      await Promise.all(
        enrolledStudents.map(async (studentId) => {
          const student = await User.findById(studentId).session(session);

          if (student) {
            student.credits += course.creditsCost;
            await student.save({ session });
          }
        })
      );
    }

    // Delete all related enrollments for this course
    const enrollmentsDeleted = await Enrollment.deleteMany({
      courseId,
    }).session(session);
    if (enrollmentsDeleted.deletedCount > 0) {
      console.log(
        `Deleted ${enrollmentsDeleted.deletedCount} enrollments for course ${courseId}`
      );
    }

    // Delete all related transactions for this course
    const transactionsDeleted = await Transaction.deleteMany({
      courseId,
    }).session(session);
    if (transactionsDeleted.deletedCount > 0) {
      console.log(
        `Deleted ${transactionsDeleted.deletedCount} transactions for course ${courseId}`
      );
    }

    // Find the instructor (user) and update their credits
    const instructor = await User.findById(course.instructorId).session(
      session
    );

    if (!instructor) {
      throw new InstructorNotFoundError(
        `Instructor with id ${course.instructorId} not found`
      );
    }

    // Subtract the course credits earned by the instructor
    instructor.credits -= course.creditsCost;
    await instructor.save({ session });

    // Remove the course from the Course collection
    await Course.deleteOne({ _id: courseId }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return {
      message: `Course "${course.title}" with id ${courseId} and related data deleted successfully.`,
    };
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting course by ID:", error);
    throw error;
  }
};

/** Fetch enrolled students by course ID and populates student details (firstName and lastName) */
export const getEnrolledStudentsService = async (courseId) => {
  try {
    const course = await Course.findById(courseId).populate(
      "enrolledStudents",
      "firstName lastName"
    );

    if (!course) {
      throw new CourseNotFoundError(`Course with id ${courseId} not found`);
    }
    return course.enrolledStudents;
  } catch (error) {
    console.error("Error fetching enrolled students by course ID:", error);
    throw error;
  }
};

/** Fetch courses by instructor ID and populates instructor details (firstName and lastName) */
export const getCoursesByInstructorId = async (instructorId) => {
  if (!instructorId) {
    throw new InstructorNotFoundError();
  } else if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    throw new ValidationError("Invalid instructor ID");
  }

  try {
    const courses = await Course.find({ instructorId }).populate(
      "instructorId",
      "firstName lastName"
    );

    return courses.length > 0 ? courses.map(formatCourseResponse) : [];
  } catch (error) {
    console.error("Unexpected error fetching courses by instructor ID:", error);
    throw new Error("Error fetching courses by instructor ID.");
  }
};

/** Fetch an individual course by its ID and populate instructor details (firstName and lastName) */
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

/** Fetch all courses and populate instructor details (firstName and lastName) */
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

/** Create a new course and save it to the database */
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
