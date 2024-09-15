import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import { getInstructorCourses } from "../api/getInstructorCourses";
import { useUser } from "../hooks/UserContext";

export default function UserCoursePage() {
  const [userCourses, setUserCourses] = useState([]); // State to hold courses
  const { userId } = useUser(); // Get userId from context (after successful login)
  const isUserCourse = true;
  const [fetched, setFetched] = useState(false); // Flag to avoid double call

  useEffect(() => {
    const fetchCourses = async () => {
      if (!userId || fetched) return; // If userId is not set or already fetched, return
      console.log("Fetching courses for userId:", userId);
      const courses = await getInstructorCourses(userId);

      if (courses.length === 0) {
        console.warn("No courses found for user:", userId);
      }
      setUserCourses(courses); // Update state with fetched courses
      setFetched(true); // Set flag to true after fetching courses
    };

    fetchCourses();
  }, [userId, fetched]); // Re-run the effect when userId changes

  return (
    <>
      <Navbar />
      <div className="h-12"></div>
      <CourseCardRow courseArray={userCourses} isUserCourse={isUserCourse} />
    </>
  );
}
