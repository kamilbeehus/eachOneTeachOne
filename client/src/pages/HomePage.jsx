import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function HomePage() {
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/courses/",
          // {
          //   withCredentials: true,
          // }
        );
        setAllCourses(response.data.courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="h-12"></div>
      <CourseCardRow courseArray={allCourses} isUserCourse={false} />
    </>
  );
}
