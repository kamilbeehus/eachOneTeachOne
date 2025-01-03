import api from "../api/apiInstance.js";
import { getCurrentUser } from "./getCurrentUser.js";

/**
 * Fetch all courses a user is enrolled in.
 *
 * @returns {Promise<Array>} List of enrolled courses or an empty array if none.
 */
export const getEnrolledCoursesByUserId = async () => {
  try {
    // Fetch the authenticated user's information
    const userData = await getCurrentUser();
    const userId = userData?._id;

    if (!userId) {
      console.info("User is not authenticated or user ID is missing.");
      return [];
    }

    const response = await api.get(`/courses/user/${userId}`);
    const courseArray = response.data.courses || [];

    if (courseArray.length === 0) {
      console.info("No enrolled courses were found for the user.");
    }

    return courseArray;
  } catch (error) {
    if (error.response?.status === 404) {
      console.info("No enrolled courses found for this user.");
    } else {
      console.error("Failed to retrieve enrolled courses.", error.message);
    }
    return [];
  }
};
