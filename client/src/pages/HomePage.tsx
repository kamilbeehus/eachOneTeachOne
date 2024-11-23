import { useEffect, useState } from "react";
import { getCourses } from "../api/getCourses";
import Navbar from "../components/Navbar";
import { filterCoursesBySkill } from "../helpers/filterCoursesBySkill";
import FilteredCourseCardRow from "../components/FilteredCourseCardRow";

export default function HomePage() {
  const [allCourses, setAllCourses] = useState([]);
  const [musicCourses, setMusicCourses] = useState([]);
  // const [cookingCourses, setCookingCourses] = useState([]);
  // const [languagesCourses, setLanguagesCourses] = useState([]);
  // const [programmingCourses, setProgrammingCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Simulate a short delay for smoother transitions
  const simulateDelay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function fetchCourses() {
    setIsLoading(true); // Start loading when fetching begins
    try {
      const courses = await getCourses();
      await simulateDelay(400);
      setAllCourses(courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setIsLoading(false); // Stop loading after fetching is done
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (allCourses.length > 0) {
      setMusicCourses(filterCoursesBySkill(allCourses, "Music"));
    }
  }, [allCourses]);

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
            <>
              {/* Show filtered course rows once data is loaded */}
              <FilteredCourseCardRow skill="Music" allCourses={allCourses} />
              <FilteredCourseCardRow
                skill="Languages"
                allCourses={allCourses}
              />
              <FilteredCourseCardRow skill="Cooking" allCourses={allCourses} />
              <FilteredCourseCardRow
                skill="Programming"
                allCourses={allCourses}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
