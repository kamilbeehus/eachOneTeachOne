import axios from "axios";
/**
 * Sends a POST request to create a course with the given payload.
 *
 * @param {Object} payload - The data for the course to be created.
 * @param {string} payload.title - The title of the course.
 * @param {string} payload.description - A brief description of the course.
 * @param {string} payload.instructorId - The ID of the instructor teaching the course.
 * @param {string} payload.skill - The skill level or category the course focuses on.
 * @param {string} payload.creditsCost - The number of credits required for enrollment.
 * @param {Object} payload.schedule - The schedule for the course.
 * @param {Date} payload.schedule.startDate - The start date and time of the course.
 * @param {Date} payload.schedule.endDate - The end date and time of the course.
 * @returns {Promise} Logs the response from the server or logs an error if the request fails.
 */

export async function postCourse(payload) {
  try {
    console.log(payload);
    const response = await axios.post(
      "http://localhost:3000/api/courses/create/",
      payload,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    console.log(e);
  }
}
