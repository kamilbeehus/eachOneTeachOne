import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import axios from "axios";

// Moved getUserCourses inside the component to utilize hooks properly
const getUserCourses = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/courses/instructor/66e5932d4084e0310cd7781e",
      // {
      //   withCredentials: true,
      // },
    );

    const courseArray = response.data.courses; // Correct field name from the server is : `courses`

    if (!courseArray || courseArray.length === 0) {
      console.warn("No courses found for the given instructor.");
      return []; // Return an empty array to avoid 'undefined' errors
    }
    return courseArray;
  } catch (error) {
    console.error("Failed to retrieve courses for the given instructor.");
    console.error(error);
    return [];
  }
};

export default function UserCoursePage() {
  const [userCourses, setUserCourses] = useState([]); // State to hold courses
  const isUserCourse = true;

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getUserCourses();
      setUserCourses(courses); // Update state with fetched courses
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-12"></div>
      <CourseCardRow courseArray={userCourses} isUserCourse={isUserCourse} />
    </>
  );
}
