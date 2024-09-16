import React from "react";
import { useUser } from "../hooks/UserContext.jsx";
import axios from "axios";
import raccoonLogo from "../assets/Avatar.png";
import { toast, ToastContainer } from "react-toastify"; // Import toast for visual feedback
import "react-toastify/dist/ReactToastify.css";

export default function CourseCard({
  courseName,
  courseDescription,
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
        "http://localhost:3000/api/courses/enroll", //TODO: Use postEnroll from api.js
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
          <h2 className="card-title">{courseName}</h2>
          <p>{courseDescription}</p>

          <div className="card-actions justify-end">
            <Edit
              isUserCourse={isUserCourse}
              handleEnrollClick={handleEnrollClick} // Pass handler function
            />
          </div>
        </div>
        <ToastContainer />
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
