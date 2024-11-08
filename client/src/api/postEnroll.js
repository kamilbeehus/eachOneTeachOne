import api from "../api/apiInstance";
/**
 * Sends a POST request to enroll a user in a specific course.
 *
 * @param {string} courseId - The ID of the course in which the user will be enrolled.
 * @returns {Promise<Object>} The response from the server, indicating the enrollment status.
 */
export async function postEnroll(payload) {
  try {
    // Fetch the authenticated user's data
    const { data: userData } = await api.get("/auth/me"); // Automatically handled by cookie

    if (!userData || !userData._id) {
      throw new Error("User is not authenticated");
    }

    const payload = {
      userId: userData._id, // Use the userId from the authenticated user
      courseId,
    };

    // Make the POST request using the API instance to enroll the user
    const response = await api.post("/courses/enroll", payload);

    console.log("Enrollment successful:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error enrolling in course:",
      error.response ? error.response.data : error.message,
    );
  }
}
