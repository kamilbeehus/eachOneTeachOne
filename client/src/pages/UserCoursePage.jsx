import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import { getInstructorCourses } from "../api/getInstructorCourses";
import { useUser } from "../hooks/UserContext";

export default function UserCoursePage() {
  const [userCourses, setUserCourses] = useState([]); // State to hold courses
  const { userId } = useUser(); // Get userId from context (after successful login)
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const isUserCourse = true;
  const [fetched, setFetched] = useState(false); // Flag to avoid double call

  // Function to simulate a delay for smooth loading transitions
  const simulateDelay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Function to fetch instructor's courses by ID
  const fetchCourses = async () => {
    if (!userId) return; // If userId is not set, return
    setIsLoading(true);

    try {
      console.log("Fetching courses for userId:", userId);

      // Fetch courses and simulate a short delay to ensure a smooth transition
      const courses = await getInstructorCourses(userId);
      await simulateDelay(500); // Adding a 500ms delay

      if (courses.length === 0) {
        console.warn("No courses found for user:", userId);
      }

      setUserCourses(courses); // Update state with fetched courses
      setFetched(true); // Set flag to true after fetching courses
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching is done
    }
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
          {isLoading ? (
            <div className="flex justify-center mt-10">
              {/* DaisyUI Loading Spinner */}
              <span className="loading loading-spinner loading-lg"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <CourseCardRow
              courseArray={userCourses}
              isUserCourse={isUserCourse}
              refreshCourses={refreshCourses}
            />
          )}
        </div>
      </div>
    </>
  );
}
