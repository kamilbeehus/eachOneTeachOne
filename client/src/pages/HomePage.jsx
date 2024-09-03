import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import axios from "axios";

const getAllCourses = async () => {
  const response = await axios.get("http://localhost:3000/api/courses/", {
    withCredentials: true,
  });
  return response.data.courses;
};
const allCourses = await getAllCourses();

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="h-12"></div>
      <CourseCardRow courseArray={allCourses} isUserCourse={false} />
    </>
  );
}
