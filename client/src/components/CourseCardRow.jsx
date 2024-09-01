import CourseCard from "./CourseCard";
import axios from "axios";

const getCourses = async () => {
  const response = await axios.get("http://localhost:3000/api/courses/", {
    withCredentials: true,
  });
  console.clear();
  console.log(response.data);
  return response.data.courses;
};
const courseArray = await getCourses();
console.log(
  "%c courseArray ",
  "background: #fa8334; color: #1b1b1b; padding: 4px; border-radius:4px; font-weight: bold;",
  courseArray,
);

export default function CourseCardRow() {
  return (
    <>
      <div className="grid content-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courseArray.map((course) => (
          <CourseCard
            key={course._id}
            courseName={course.title}
            courseDescription={course.description}
          />
        ))}
      </div>
    </>
  );
}
