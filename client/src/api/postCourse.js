import api from "../api/apiInstance.js";
import { getCurrentUser } from "../api/getCurrentUser.js";

/**
 * Sends a POST request to create a course with the given payload.
 *
 * @param {Object} payload - The data for the course to be created.
 * @param {string} payload.title - The title of the course.
 * @param {string} payload.description - A brief description of the course.
 * @param {string} payload.skill - The skill level or category the course focuses on.
 * @param {number} payload.creditsCost - The number of credits required for enrollment.
 * @param {Object} payload.schedule - The schedule for the course.
 * @param {Date} payload.schedule.startDate - The start date and time of the course.
 * @param {Date} payload.schedule.endDate - The end date and time of the course.
 * @returns {Promise<Object>} The response data from the server.
 */
export async function postCourse(payload) {
  try {
    // Retrieve the authenticated user's details for the instructor ID.
    const userData = await getCurrentUser();
    const instructorId = userData?._id;

    if (!userData || !userData._id) {
      throw new Error("Failed to retrieve instructor ID.");
    }

    // Include instructorId in the payload
    const coursePayload = {
      ...payload,
      instructorId, // Set from authenticated user data
    };

    console.log(coursePayload);

    // Make the POST request to create the course
    const response = await api.post("/courses/create", coursePayload);

    console.log("Course created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create course:",
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || "Failed to create course.",
    );
  }
}
