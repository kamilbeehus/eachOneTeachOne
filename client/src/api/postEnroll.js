import api from "../api/apiInstance";
import { getCurrentUser } from "./getCurrentUser.js";

/**
 * Sends a POST request to enroll a user in a specific course.
 *
 * @param {string} courseId - The ID of the course in which the user will be enrolled.
 * @returns {Promise<Object>} The response from the server, indicating the enrollment status.
 */
export async function postEnroll(courseId) {
  try {
    const userData = await getCurrentUser();
    const userId = userData?._id;

    if (!userData || !userId) {
      throw new Error("User is not authenticated");
    }

    const payload = {
      userId,
      courseId,
    };

    // Make the POST request using the API instance to enroll the user
    const response = await api.post("/courses/enroll", payload);

    console.log("Enrollment successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
}
