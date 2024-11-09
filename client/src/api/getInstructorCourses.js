import { api } from "../api/apiInstance.js";
import { getCurrentUser } from "./getCurrentUser.js";

// Utility function to fetch all courses for a specific instructor by userId
export const getInstructorCourses = async () => {
  try {
    // Fetch data from current authenticated User
    const userData = await getCurrentUser();
    const userId = userData?._id;

    if (!userId) {
      console.error("User ID not found. Ensure the user is authenticated.");
      return [];
    }

    const response = await api.get(`/courses/instructor/${userId}`);
    const courseArray = response.data.courses || [];

    if (courseArray.length === 0) {
      console.warn("No courses found for the instructor.");
    }

    return courseArray;
  } catch (error) {
    console.error("Failed to retrieve courses for the instructor.", error);
    return [];
  }
};
