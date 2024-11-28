import api from "../api/apiInstance.js";
import { getCurrentUser } from "./getCurrentUser.js";

/**
 * Fetch all courses offered by an instructor.
 *
 * @returns {Promise<Array>} List of instructor courses or an empty array if none.
 */
export const getInstructorCourses = async () => {
  try {
    // Fetch data from current authenticated User
    const userData = await getCurrentUser();
    const userId = userData?._id;

    if (!userId) {
      console.info("User is not authenticated or user ID is missing.");
      return [];
    }

    const response = await api.get(`/courses/instructor/${userId}`);
    const courseArray = response.data.courses || [];

    if (courseArray.length === 0) {
      console.info("No courses offered by the instructor were found.");
    }

    return courseArray;
  } catch (error) {
    if (error.response?.status === 404) {
      console.info("No instructor courses found for this user.");
    } else {
      console.error("Failed to retrieve instructor courses.", error.message);
    }
    return [];
  }
};
