import api from "../api/apiInstance";

export async function getCourses() {
  try {
    const response = await api.get("/courses");
    return response.data.courses;
  } catch (err) {
    console.error("Error fetching courses:", err);
  }
}
