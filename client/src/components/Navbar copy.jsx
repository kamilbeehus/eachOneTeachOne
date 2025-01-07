import { Link } from "react-router-dom";
import Search from "./Search";
import AvatarLogo from "../assets/Avatar.png";
import LogoEoToSvg from "../assets/LogoEoTo.svg";
import ThemeController from "./ThemeController";

export default function Navbar() {
  return (
    <nav className="navbar sticky top-0 z-50 border-b border-neutral-700/80 py-3 backdrop-blur-lg">
      {/* kj<div className="navbar bg-base-100"> */}
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost rounded-full">
          <img
            src={LogoEoToSvg}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "40px",
              minWidth: "20px",
              minHeight: "20px",
            }}
          />
        </Link>
        <ThemeController />
      </div>
      <div className="flex-none gap-2">
        <Search />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              {/* Todo: insert teachers profile photo */}
              <img alt="Tailwind CSS Navbar component" src={AvatarLogo} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow"
          >
            {/* <li>
              <Link to="/settings">Settings</Link>
            </li> */}
            <li>
              <Link to="/usercourses">My Courses</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
