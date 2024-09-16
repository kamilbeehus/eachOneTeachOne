import CourseCard from "./CourseCard";
import OfferCourse from "./OfferCourse";

export default function CourseCardRow({ courseArray = [], isUserCourse }) {
  return (
    <>
      {/* <div className="grid content-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 content-center justify-items-center gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 px-8">
          {courseArray.map((course) => {
            // Ensure each course object is valid
            if (!course || !course.title || !course._id) {
              return null;
            }

            return (
              <CourseCard
                key={course._id}
                courseId={course._id} // Pass the courseId as a prop to the child component
                courseName={course.title}
                courseDescription={course.description}
                isUserCourse={isUserCourse}
              />
            );
          })}
          <div className="flex items-center justify-items-center justify-center">
            <OfferCourse isUserCourse={isUserCourse} />
          </div>
        </div>
      </div>
    </>
  );
}
