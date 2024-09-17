import mongoose from "mongoose";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import {
  UserNotFoundError,
  ValidationError,
  CourseNotFoundError,
} from "../errors/customErrors.js";
import { createTransaction } from "../services/transactionService.js";

/** Enroll a User in a Course */
export const enrollUserInCourse = async (userId, courseId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the User exists
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new UserNotFoundError(`User with ID ${userId} not found`);
    }

    // Check if the Course exists
    const course = await Course.findById(courseId).session(session);
    if (!course) {
      throw new CourseNotFoundError(`Course with ID ${courseId} not found`);
    }

    // Check if the User is alredy enrolled in the given Course, in that case the User is not allowed to enroll again
    const existingEnrollment = await Enrollment.findOne({
      userId,
      courseId,
    }).session(session);
    if (existingEnrollment) {
      throw new ValidationError("User is already enrolled in this course");
    }

    // Check if the User has enough credits to spend on the Course
    if (user.credits < course.creditsCost) {
      throw new ValidationError(
        "User does not have enough credits to enroll in this course"
      );
    }

    // Create Enrollment
    const enrollment = new Enrollment({
      userId,
      courseId,
    });
    await enrollment.save({ session });

    // Deduct credits from User after enrollment
    user.credits -= course.creditsCost;
    await user.save({ session }); // Save updated User in the database

    // Add User to Course's enrolledStudents array
    course.enrolledStudents.push(userId);
    await course.save({ session }); // Save updated Course in the database

    // Create a new Transaction for spent credits on enrollment
    await createTransaction(
      {
        userId,
        type: "spent",
        amount: course.creditsCost,
        courseId,
      },
      session // Pass the session to the transaction service
    );

    await session.commitTransaction();
    session.endSession();

    // Populate the user details in the response
    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate("userId", "firstName lastName")
      .populate("courseId", "title");

    return populatedEnrollment;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
