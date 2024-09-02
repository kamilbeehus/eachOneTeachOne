import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import axios from "axios";

const getUserCourses = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/courses/66d411878418b8305289364f",
    {
      withCredentials: true,
    },
  );
  let courseArray = [];
  courseArray.push(response.data.course);

  return courseArray;
};
const userCourses = await getUserCourses();
const isUserCourse = true;

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="h-12"></div>
      <CourseCardRow courseArray={userCourses} isUserCourse={isUserCourse} />
    </>
  );
}
