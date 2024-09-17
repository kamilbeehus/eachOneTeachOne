import { useUser } from "../hooks/UserContext.jsx";
import axios from "axios";
import raccoonLogo from "../assets/Avatar.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getHumanReadableDate } from "../helpers/getHumanReadableDate.js";
import { getHumanReadableTime } from "../helpers/getHumanReadableTime.js";
import { Coins, Calendar, Clock } from "lucide-react";
import EditCourse from "./EditCourse.jsx";

export default function CourseCard({
  course,
  courseId, // This courseId is passed from the parent component
  isUserCourse,
}) {
  const { userId } = useUser(); // Access the userId from context

  const handleEnrollClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to enroll in a course.");
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
      toast.success("You are now enrolled in the course!");
    } catch (error) {
      console.error("Enrollment failed:", error.message);
      toast.error("Enrollment failed. Please try again.");
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
          <h2 className="card-title font-bold">{course.title}</h2>
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
          <div className="flex items-center">
            <Coins className="stroke-primary "></Coins>
            <div className="pl-2 font-semibold">{course.creditsCost}</div>
          </div>

          <div className="card-actions justify-end">
            <EditOrEnroll
              isUserCourse={isUserCourse}
              handleEnrollClick={handleEnrollClick} // Pass handler function
              course={course}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

function EditOrEnroll({ isUserCourse, handleEnrollClick, course }) {
  if (isUserCourse) {
    return <EditCourse course={course} key={course._id} />;
  } else {
    return (
      <button className="btn btn-primary" onClick={handleEnrollClick}>
        Enroll
      </button>
    );
  }
}
