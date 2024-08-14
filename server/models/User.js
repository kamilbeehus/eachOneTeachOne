import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true, 
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'No bio provided'
    },
    profilePicture: {
        type: String,
        default: '/images/profileDefault.jpg'
    },
    credits : {
        type: Number,
        default: 1
    },
    createdCourses: {
        type: [String], // TODO: Change later to an array of ObjectIds from the Course model
        default: []
    },
    enrolledCourses: {
        type: [String], 
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// This will automatically create a collection called 'users' in the MongoDB database
const User = mongoose.model('User', userSchema);

export default User;