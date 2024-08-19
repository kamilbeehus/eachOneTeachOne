import mongoose from "mongoose";

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
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  creditsCost: {
    type: Number,
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
    default: 1,
  },
  enrolledStudents: {
    type: [mongoose.Schema.Types.ObjectId], // Array of User IDs
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes to optimize queries
courseSchema.index({ skillId: 1 });
courseSchema.index({ instructorId: 1 });

const Course = mongoose.model("Course", courseSchema);

export default Course;
