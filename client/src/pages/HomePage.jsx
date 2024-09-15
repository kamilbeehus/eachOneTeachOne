import { useEffect, useState } from "react";
import CourseCardRow from "../components/CourseCardRow";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function HomePage() {
  useEffect(() => {
    fetchCourses();
  }, []);

  const [allCourses, setAllCourses] = useState([]);

  async function fetchCourses() {
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
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div className="flex-grow overflow-auto">
          <Navbar />
          <CourseCardRow courseArray={allCourses} isUserCourse={false} />
        </div>
      </div>
    </>
  );
}
