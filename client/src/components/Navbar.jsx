import { Link } from "react-router-dom";
import AvatarLogo from "../assets/Avatar.png";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">EachOneTeachOne</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {/* Todo: insert teachers profile photo */}
              <img alt="Tailwind CSS Navbar component" src={AvatarLogo} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* Todo: add these options once, they are needed */}
            {/* <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li>
              <Link to="/">logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
