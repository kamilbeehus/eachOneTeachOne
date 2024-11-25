import api from "../api/apiInstance.js";
import { getCurrentUser } from "./getCurrentUser.js";

// Utility function to fetch all courses for a specific instructor by userId
export const getEnrolledCoursesByUserId = async () => {
  try {
    // Fetch the authenticated user's information
    const userData = await getCurrentUser();
    const userId = userData?._id;

    if (!userId) {
      console.error("User ID not found. Ensure the user is authenticated.");
      return [];
    }

    const response = await api.get(`/courses/user/${userId}`);
    const courseArray = response.data.courses || [];

    if (courseArray.length === 0) {
      console.warn("No enrolled courses found for the user.");
    }

    return courseArray;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("Courses not found for this user.");
    } else {
      console.error(
        "Failed to retrieve enrolled courses for the user.",
        error.message,
      );
    }
    return [];
  }
};
