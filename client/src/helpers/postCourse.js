export async function postCourse(payload) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/courses/create/",
      payload,
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
