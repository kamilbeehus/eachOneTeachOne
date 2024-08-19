import CourseCardColumn from "../components/CourseCardColumn";
import Navbar from "../components/Navbar";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="h-12"></div>
      <CourseCardColumn />
    </>
  );
}
