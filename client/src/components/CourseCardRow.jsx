import CourseCard from "./CourseCard";

export default function CourseCardRow({ courseArray = [], isUserCourse }) {
  return (
    <>
      {/* <div className="grid content-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 content-center justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 px-8">
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
      </div>
    </>
  );
}

function AddCourse({ isUserCourse }) {
  if (isUserCourse) {
    return <button className="btn btn-primary">Add a Course</button>;
  } else {
    null;
  }
}
