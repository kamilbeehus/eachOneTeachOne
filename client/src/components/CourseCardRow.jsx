import CourseCard from "./CourseCard";
import UsercourseForm from "./UsercourseForm";
import { useState } from "react";

export default function CourseCardRow({ courseArray = [], isUserCourse }) {
  return (
    <>
      <div className="grid content-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courseArray.map((course) => {
          // Ensure each course object is valid
          if (!course || !course.title) {
            return null;
          }

          return (
            <CourseCard
              key={course._id}
              courseName={course.title}
              courseDescription={course.description}
              isUserCourse={isUserCourse}
            />
          );
        })}
        <div className="flex items-center justify-center">
          <AddCourse isUserCourse={isUserCourse} />
        </div>
      </div>
    </>
  );
}

function AddCourse({ isUserCourse }) {
  if (isUserCourse) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
      <>
        <button className="btn btn-primary" onClick={handleClick}>
          Add a Course
        </button>
        {isOpen && (
          <UsercourseForm onClose={handleClose} />
        )}
      </>
    );
  } else {
    return null;
  }
}