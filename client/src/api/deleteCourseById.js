import api from "../api/apiInstance";
import { getCurrentUser } from "./getCurrentUser.js";

/**
 * Deletes a course by its ID.
 *
 * This function sends a DELETE request to the API to remove a course specified by the courseId.
 * It first retrieves the current user's data to ensure the user is authenticated.
 * If the user is not authenticated, an error is thrown.
 *
 * @param {string} courseId - The ID of the course to be deleted.
 * @returns {Promise<Object>} - The response data from the API if the deletion is successful.
 * @throws {Error} - Throws an error if the user is not authenticated or if the API request fails.
 */
export async function deleteCourseById(courseId) {
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

        // Make the DELETE request using the API instance to delete the course
        const response = await api.delete(`/courses/${courseId}`, payload);

        console.log("Course deletion successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
}