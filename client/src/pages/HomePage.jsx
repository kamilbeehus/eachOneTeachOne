import { Link } from "react-router-dom";
import SkillCardColumn from "../components/SkillCardColumn";
import Navbar from "../components/Navbar";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="h-12"></div>
      <SkillCardColumn />
    </>
  );
}
