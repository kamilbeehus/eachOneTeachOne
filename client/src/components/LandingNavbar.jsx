import { Link } from "react-router-dom";
import AvatarLogo from "../assets/Avatar.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoEoToSvg from "../assets/LogoEoTo.svg";

export default function LandingNavbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleLandingNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
             <img className="h-10 w-10 mr-2" src={LogoEoToSvg} alt="Logo" />
            <span className="text-xl tracking-tight">EachOneTeachOne</span>
          </div>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <Link to="/login" className=" px-1">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/Signup" className=" px-1">
              <button className="btn btn-primary">Create an account</button>
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleLandingNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
//         <ul
//           tabIndex={0}
//           className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//         >
//           {/* Todo: add these options once, they are needed */}
//           <li>
//             <a className="justify-between">Profile</a>
//           </li>
//           <li>
//             <Link to="/usercourses">My Courses</Link>
//           </li>
//           <li>
//             <Link to="/">logout</Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
// );
