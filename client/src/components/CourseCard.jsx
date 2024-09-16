import { useUser } from "../hooks/UserContext.jsx";
import axios from "axios";
import raccoonLogo from "../assets/Avatar.png";
import { getHumanReadableDate } from "../helpers/getHumanReadableDate.js";
import { getHumanReadableTime } from "../helpers/getHumanReadableTime.js";
import { Calendar, Clock } from "lucide-react";

export default function CourseCard({
  course,
  courseId, // This courseId is passed from the parent component
  isUserCourse,
}) {
  const { userId } = useUser(); // Access the userId from context

  const handleEnrollClick = async () => {
    if (!userId) {
      alert("You must be logged in to enroll in a course.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/courses/enroll",
        { userId, courseId },
      );

      if (!response.data) {
        throw new Error("Enrollment failed");
      }

      alert("Enrolled successfully!");
    } catch (error) {
      console.error("Enrollment failed:", error.message);
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl max-w-64">
        <figure>
          {/* Todo: insert teachers profile photo */}
          <img src={raccoonLogo} alt="raccoon" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{course.title}</h2>
          <p className="line-clamp-2">{course.description}</p>
          <div className="flex items-center space-x-2 pt-2">
            <Calendar className="stroke-primary" />
            <p>{getHumanReadableDate(course.schedule.startDate)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="stroke-primary" />
            <p>
              {getHumanReadableTime(course.schedule.startDate)} -{" "}
              {getHumanReadableTime(course.schedule.endDate)}
            </p>
          </div>

          <div className="card-actions justify-end">
            <Edit
              isUserCourse={isUserCourse}
              handleEnrollClick={handleEnrollClick} // Pass handler function
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Edit({ isUserCourse, handleEnrollClick }) {
  if (isUserCourse) {
    return <button className="btn btn-primary">Edit</button>;
  } else {
    return (
      <button className="btn btn-primary" onClick={handleEnrollClick}>
        Enroll
      </button>
    );
  }
}
