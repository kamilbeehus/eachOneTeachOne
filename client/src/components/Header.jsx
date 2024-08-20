import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14"
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold ">{heading}</h2>
      <p className="text-center text-sm mt-5">
        {paragraph}{" "}
        <Link to={linkUrl} className="font-medium link-secondary">
          {linkName}
        </Link>
      </p>
    </div>
  );
}
