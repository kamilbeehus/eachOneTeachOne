import axios from "axios";

// Utility function to fetch all courses for a specific instructor by userId
export const getInstructorCourses = async (userId) => {
  if (!userId) {
    console.error("Invalid userId provided");
    return [];
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/api/courses/instructor/${userId}`,
      {
        withCredentials: true,
      },
    );
    const courseArray = response.data.courses || [];

    if (courseArray.length === 0) {
      console.warn("No courses found for the instructor.");
    }

    return courseArray;
  } catch (error) {
    console.error("Failed to retrieve courses for the instructor.", error);
    return [];
  }
};
