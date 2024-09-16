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

  // Function to fetch instructor's courses by ID
  const fetchCourses = async () => {
    if (!userId) return; // If userId is not set, return
    console.log("Fetching courses for userId:", userId);
    const courses = await getInstructorCourses(userId);

    if (courses.length === 0) {
      console.warn("No courses found for user:", userId);
    }
    setUserCourses(courses); // Update state with fetched courses
    setFetched(true); // Set flag to true after fetching courses
  };

  // Function to refresh courses, after successful course creation
  const refreshCourses = () => {
    setFetched(false); // Reset flag to false
    fetchCourses(); // Re-fetch courses
  };

  useEffect(() => {
    if (!fetched) {
      fetchCourses(); // Fetch courses on initial render or when refresh is triggered
    }
  }, [userId, fetched]); // Re-run the effect when userId changes

  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div className="flex-grow overflow-auto">
          <Navbar />
          <CourseCardRow
            courseArray={userCourses}
            isUserCourse={isUserCourse}
            refreshCourses={refreshCourses}
          />
        </div>
      </div>
    </>
  );
}
