import CourseCardRow from "./CourseCardRow.tsx";
import { filterCoursesBySkill } from "../helpers/filterCoursesBySkill";
import { useEffect, useState } from "react";

export default function CourseCardRowFiltered({
  skill,
  allCourses,
}: {
  skill: String;
  allCourses: any;
}) {
  const [skillCourses, setSkillCourses] = useState([]);

  useEffect(() => {
    if (allCourses.length > 0) {
      setSkillCourses(filterCoursesBySkill(allCourses, skill));
    }
  }, [allCourses, skill]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 pt-20 sm:grid-cols-2 sm:pl-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <h1 className="text-center text-3xl font-medium tracking-wide sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent">
              {skill}
            </span>
          </h1>
        </div>
      </div>
      <CourseCardRow courseArray={skillCourses} isUserCourse={false} />
    </div>
  );
}
