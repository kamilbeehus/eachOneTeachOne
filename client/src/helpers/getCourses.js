import axios from "axios";

export async function fetchCourses() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/courses/",
      // {
      //   withCredentials: true,
      // }
    );
    return response.data.courses;
  } catch (err) {
    console.error("Error fetching courses:", err);
  }
}
