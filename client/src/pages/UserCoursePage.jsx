import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow.tsx";
import Navbar from "../components/Navbar";
import { getInstructorCourses } from "../api/getInstructorCourses";
import { getEnrolledCoursesByUserId } from "../api/getEnrolledCoursesByUserId";

export default function UserCoursePage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]); // State to hold courses
  const [offeredCourses, setOfferedCourses] = useState([]);
  const [isLoadingOffered, setIsLoadingOffered] = useState(true);
  const [isLoadingEnrolled, setIsLoadingEnrolled] = useState(true);
  const [fetched, setFetched] = useState(false); // Flag to avoid double call

  const isUserCourse = true;

  // Function to simulate a delay for smooth loading transitions
  const simulateDelay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Function to fetch instructor's offered courses by ID
  const fetchOfferedCourses = async () => {
    setIsLoadingOffered(true);
    try {
      // Fetch courses and simulate a short delay to ensure a smooth transition
      const courses = await getInstructorCourses();
      await simulateDelay(500); // Adding a 500ms delay
      setOfferedCourses(courses); // Update state with fetched courses
      setFetched(true); // Set flag to true after fetching courses
    } catch (error) {
      console.error("Error fetching user offered courses:", error);
    } finally {
      setIsLoadingOffered(false); // Set loading to false after fetching is done
    }
  };

  // Function to fetch enrolled courses by ID
  const fetchEnrolledCourses = async () => {
    setIsLoadingEnrolled(true);
    try {
      // Fetch enrolled courses and simulate a short delay to ensure a smooth transition
      const courses = await getEnrolledCoursesByUserId();
      await simulateDelay(500); // Adding a 500ms delay
      setEnrolledCourses(courses); // Update state with fetched courses
      setFetched(true); // Set flag to true after fetching courses
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setIsLoadingEnrolled(false); // Set loading to false after fetching is done
    }
  };

  // Function to refresh courses, after successful course creation
  const refreshCourses = () => {
    setFetched(false); // Reset flag to false
    fetchOfferedCourses(); // Re-fetch courses
    console.log("TRIGGERED refreshCourses");
  };

  useEffect(() => {
    if (!fetched) {
      fetchOfferedCourses(); // Fetch courses on initial render or when refresh is triggered
      fetchEnrolledCourses();
    }
  }, [fetched]); // Re-run the effect when userId changes

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow overflow-auto">
          <Navbar />
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 pt-20 sm:grid-cols-2 sm:pl-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <h1 className="text-center text-3xl font-medium tracking-wide sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent">
                  Offered
                </span>
              </h1>
            </div>
          </div>
          {isLoadingOffered ? (
            <div className="mt-10 flex justify-center">
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
            <div className="grid grid-cols-1 gap-6 pt-20 sm:grid-cols-2 sm:pl-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <h1 className="text-center text-3xl font-medium tracking-wide sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent">
                  Enrolled
                </span>
              </h1>
            </div>
          </div>
          {isLoadingEnrolled ? (
            <div className="mt-10 flex justify-center">
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
