import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow";
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

  async function fetchCourses() {
    const courses = await getCourses();
    setAllCourses(courses);
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
          <FilteredCourseCardRow skill="Music" allCourses={allCourses} />
          <FilteredCourseCardRow skill="Languages" allCourses={allCourses} />
          <FilteredCourseCardRow skill="Cooking" allCourses={allCourses} />
          <FilteredCourseCardRow skill="Programming" allCourses={allCourses} />
        </div>
      </div>
    </>
  );
}
