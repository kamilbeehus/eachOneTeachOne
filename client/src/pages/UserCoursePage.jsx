import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import { getInstructorCourses } from "../api/getInstructorCourses";
import { getEnrolledCoursesByUserId } from "../api/getEnrolledCoursesByUserId";
// import { useUser } from "../hooks/UserContext";

export default function UserCoursePage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]); // State to hold courses
  const [offeredCourses, setOfferedCourses] = useState([]);
  // const { userId } = useUser(); // Get userId from context (after successful login)
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const isUserCourse = true;
  const [fetched, setFetched] = useState(false); // Flag to avoid double call

  // Function to simulate a delay for smooth loading transitions
  const simulateDelay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Function to fetch instructor's courses by ID
  const fetchOfferedCourses = async () => {
    if (!userId) return; // If userId is not set, return
    setIsLoading(true);

    try {
      console.log("Fetching offered courses for userId:", userId);

      // Fetch courses and simulate a short delay to ensure a smooth transition
      const courses = await getInstructorCourses(userId);
      await simulateDelay(500); // Adding a 500ms delay

      if (courses.length === 0) {
        console.warn("No offered courses found for user:", userId);
      }

      setOfferedCourses(courses); // Update state with fetched courses
      setFetched(true); // Set flag to true after fetching courses
    } catch (error) {
      console.error("Error fetching user offered courses:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching is done
    }
  };

  // Function to fetch enrolled courses by ID
  const fetchEnrolledCourses = async () => {
    if (!userId) return; // If userId is not set, return
    setIsLoading(true);

    try {
      console.log("Fetching enrolled courses for userId:", userId);

      // Fetch enrolled courses and simulate a short delay to ensure a smooth transition
      const courses = await getEnrolledCoursesByUserId(userId);
      await simulateDelay(500); // Adding a 500ms delay

      if (courses.length === 0) {
        console.warn("No enrolled courses found for user:", userId);
      }

      setEnrolledCourses(courses); // Update state with fetched courses
      setFetched(true); // Set flag to true after fetching courses
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching is done
    }
  };

  // Function to refresh courses, after successful course creation
  const refreshCourses = () => {
    setFetched(false); // Reset flag to false
    fetchOfferedCourses(); // Re-fetch courses
  };

  useEffect(() => {
    if (!fetched) {
      fetchOfferedCourses(userId); // Fetch courses on initial render or when refresh is triggered
      fetchEnrolledCourses(userId);
    }
  }, [userId, fetched]); // Re-run the effect when userId changes

  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div className="flex-grow overflow-auto">
          <Navbar />
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 pt-20 sm:pl-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide font-medium">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Offered
                </span>
              </h1>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center mt-10">
              {/* DaisyUI Loading Spinner */}
              <span className="loading loading-spinner loading-lg"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <CourseCardRow
              courseArray={offeredCourses}
              isUserCourse={isUserCourse}
              refreshCourses={refreshCourses}
            />
          )}
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 pt-20 sm:pl-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide font-medium">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Enrolled
                </span>
              </h1>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center mt-10">
              {/* DaisyUI Loading Spinner */}
              <span className="loading loading-spinner loading-lg"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <CourseCardRow
              courseArray={enrolledCourses}
              refreshCourses={refreshCourses}
            />
          )}
        </div>
      </div>
    </>
  );
}
