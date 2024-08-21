import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "No bio provided",
  },
  profilePicture: {
    type: String,
    default: "/images/profileDefault.jpg",
  },
  credits: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to encrypt the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

// Compares input plain-text password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// This will automatically create a collection called 'users' in the MongoDB database
const User = mongoose.model("User", userSchema);

export default User;
