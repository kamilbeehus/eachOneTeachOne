import axios from "axios";

// Utility function to fetch all courses for a specific instructor by userId
export const getEnrolledCoursesByUserId = async (userId) => {
  if (!userId) {
    console.error("Invalid userId provided");
    return [];
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/api/courses/user/${userId}`,
      {
        withCredentials: true,
      },
    );
    const courseArray = response.data.courses || [];

    if (courseArray.length === 0) {
      console.warn("No enrolled courses found for the user.");
    }

    return courseArray;
  } catch (error) {
    console.error("Failed to retrieve enrolled courses for the user.", error);
    return [];
  }
};
