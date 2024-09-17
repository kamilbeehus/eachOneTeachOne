import mongoose from "mongoose";
import { skillsEnum } from "../enums/skillsEnum.js";

/** Course Schema for MongoDB collection */
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skill: {
    type: String,
    enum: skillsEnum,
    required: true,
  },
  creditsCost: {
    type: Number,
    min: 1,
    default: 1,
  },
  schedule: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  maxStudents: {
    type: Number,
    min: 1,
    default: 1,
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId, // Array of User IDs
      ref: "User",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes to optimize queries
courseSchema.index({ instructorId: 1 });

// Ensure the endDate is after startDate
courseSchema.pre("save", function (next) {
  if (this.schedule.endDate <= this.schedule.startDate) {
    return next(new Error("End date must be after the start date."));
  }
  next();
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
