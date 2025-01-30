import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-700/80 py-3 backdrop-blur-lg">
      <div className="container relative mx-auto px-4 lg:text-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            {/* <img className="h-10 w-10 mr-2" src={AvatarLogo} alt="Logo" /> */}
            <span className="tracking-tight md:text-xl">
              EachOne
              <br />
              TeachOne
            </span>
          </div>
          <div className="flex-col justify-center space-x-2">
            <Link to="/login" className="px-1">
              <Button> Login</Button>
            </Link>
            <Link to="/Signup" className="px-1">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
