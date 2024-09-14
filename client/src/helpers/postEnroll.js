import axios from "axios";
/**
 * Sends a POST request to enroll a user in a specific course.
 *
 * @param {string} userId - The ID of the user to enroll.
 * @param {string} courseId - The ID of the course in which the user will be enrolled.
 * @returns {Promise<Object>} The response from the server, indicating the enrollment status.
 */
export async function postEnroll(payload) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/courses/enroll/",
      payload,
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
