import { Link } from "react-router-dom";
import LogoEoToSvg from "../assets/LogoEoTo.svg";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <h2 className="mt-6 text-center text-3xl font-extrabold">{heading}</h2>
      <p className="mt-5 text-center text-sm">
        {paragraph}{" "}
        <Link to={linkUrl} className="link-primary font-medium">
          {linkName}
        </Link>
      </p>
    </div>
  );
}
