import mongoose from "mongoose";

// Transaction schema for MongoDB collection
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["earned", "spent"],
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Amount must be non-negative
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

// Indexes to optimize queries
transactionSchema.index({ userId: 1 });
transactionSchema.index({ courseId: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
