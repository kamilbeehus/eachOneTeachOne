import { Link } from "react-router-dom";
//import LogoEoTo.svg from "..\assets\LogoEoTo.svg" ;
import LogoEoToSvg from "../assets/LogoEoTo.svg";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img className="h-14 w-14" src={LogoEoToSvg} alt="" />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold ">{heading}</h2>
      <p className="text-center text-sm mt-5">
        {paragraph}{" "}
        <Link to={linkUrl} className="font-medium link-primary">
          {linkName}
        </Link>
      </p>
    </div>
  );
}
