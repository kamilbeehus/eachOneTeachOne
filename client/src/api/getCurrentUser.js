import api from "../api/apiInstance.js";

/**
 * Fetches the currently authenticated user's data
 * @returns {Promise<Object>} The user's data, including the userId
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data.user;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};
