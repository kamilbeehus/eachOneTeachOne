import CourseCard from "./CourseCard";
import CourseOfferDialog from "./CourseOfferDialog";
import OfferCourse from "./OfferCourse";

export default function CourseCardRow({
  courseArray = [],
  isUserCourse,
  refreshCourses,
}) {
  return (
    <>
      {/* <div className="grid content-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 content-center justify-items-center gap-6 px-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {courseArray.map((course) => {
            // Ensure each course object is valid
            if (!course || !course.title || !course._id) {
              return null;
            }

            return (
              <CourseCard
                course={course}
                key={course._id}
                courseId={course._id} // Pass the courseId as a prop to the child component
                courseName={course.title}
                courseDescription={course.description}
                isUserCourse={isUserCourse}
              />
            );
          })}
          <div className="flex items-center justify-center justify-items-center">
            {/* Pass refreshCourses to OfferCourse */}
            <CourseOfferDialog />
            <OfferCourse
              isUserCourse={isUserCourse}
              refreshCourses={refreshCourses}
            />
          </div>
        </div>
      </div>
    </>
  );
}
