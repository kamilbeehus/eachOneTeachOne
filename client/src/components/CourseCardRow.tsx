import CourseCard from "./CourseCard.tsx";
import CourseOfferDialog from "./CourseOfferForm";
export default function CourseCardRow({
  courseArray = [],
  isUserCourse,
  refreshCourses,
}: {
  courseArray: any;
  isUserCourse: boolean;
  refreshCourses: any;
}) {
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 content-center justify-items-center gap-6 px-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {courseArray.map((course: any) => {
            // Ensure each course object is valid
            if (!course || !course.title || !course._id) {
              return null;
            }

            return (
              <CourseCard
                course={course}
                key={course._id}
                courseId={course._id} // Pass the courseId as a prop to the child component
                // courseName={course.title}
                // courseDescription={course.description}
                isUserCourse={isUserCourse}
              />
            );
          })}
          <div className="flex items-center justify-center justify-items-center">
            {/* Pass refreshCourses to OfferCourse */}
            <CourseOfferDialog
              refreshCourses={refreshCourses}
              isUserCourse={isUserCourse}
            />
          </div>
        </div>
      </div>
    </>
  );
}
