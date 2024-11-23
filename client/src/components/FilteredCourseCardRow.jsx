import CourseCardRow from "./CourseCardRow";
import { filterCoursesBySkill } from "../helpers/filterCoursesBySkill";
import { useEffect, useState } from "react";

export default function FilteredCourseCardRow({ skill, allCourses }) {
  const [skillCourses, setSkillCourses] = useState([]);

  useEffect(() => {
    if (allCourses.length > 0) {
      setSkillCourses(filterCoursesBySkill(allCourses, skill));
    }
  }, [allCourses, skill]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 pt-20 sm:pl-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <h1 className=" text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide font-medium">
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              {skill}
            </span>
          </h1>
        </div>
      </div>
      <CourseCardRow courseArray={skillCourses} isUserCourse={false} />
    </div>
  );
}
