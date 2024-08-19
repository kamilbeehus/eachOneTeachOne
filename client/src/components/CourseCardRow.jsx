import CourseCard from "./CourseCard";

export default function CourseCardRow() {
  return (
    <>
      <div className="card grid sm:grid-cols-4 grid-cols-2 gap-6">
        <CourseCard
          courseName="guitar lesson"
          courseDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
        <CourseCard
          courseName="cooking"
          courseDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
        <CourseCard
          courseName="dancing"
          courseDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
        <CourseCard
          courseName="maths"
          courseDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
      </div>
    </>
  );
}
