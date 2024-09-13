import axios from "axios";

export async function getUserById(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${userId}`,
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
