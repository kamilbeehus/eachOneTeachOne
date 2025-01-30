import { Calendar, Clock, Coins } from "lucide-react";
import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

import { postEnroll } from "../api/postEnroll.js";
import raccoonLogo from "../assets/Avatar.png";
import { getHumanReadableDate } from "../helpers/getHumanReadableDate.js";
import { getHumanReadableTime } from "../helpers/getHumanReadableTime.js";

export default function CourseCard({
  course,
  courseId, // This courseId is passed from the parent component
  isUserCourse,
}: {
  course: any;
  courseId: any;
  isUserCourse: any;
}) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState("");

  const handleEnrollClick = async () => {
    setIsEnrolling(true);
    setError("");

    try {
      // Call the postEnroll function (which automatically handles user authentication via cookies)
      const response = await postEnroll(courseId);

      if (response?.success) {
        // toast.success("You are now enrolled in the course!");
      } else {
        console.warn("Unexpected API response:", response);
        throw new Error(response?.message || "Unexpected response structure");
      }
    } catch (error) {
      console.error("Enrollment failed:", error.message);

      // toast.error("Enrollment failed. Please try again.");
      setError("Enrollment failed. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <>
      <div className="bg-base card max-w-64 shadow-xl">
        <figure>
          {/* Todo: insert teachers profile photo */}
          <img src={raccoonLogo} alt="raccoon" />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold">{course.title}</h2>
          <p>{course.description}</p>
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
          <div className="flex items-center">
            <Coins className="stroke-primary"></Coins>
            <div className="pl-2 font-semibold">{course.creditsCost}</div>
          </div>

          <div className="card-actions justify-end">
            <Edit
              isUserCourse={isUserCourse}
              isEnrolling={isEnrolling}
              handleEnrollClick={handleEnrollClick} // Pass handler function
            />
          </div>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}

function Edit({ isUserCourse, isEnrolling, handleEnrollClick }) {
  if (isUserCourse) {
    return <button className="btn btn-primary">Edit</button>;
  } else {
    return (
      <button className="btn btn-primary" onClick={handleEnrollClick}>
        {isEnrolling ? "Enrolling..." : "Enroll"}
      </button>
    );
  }
}
