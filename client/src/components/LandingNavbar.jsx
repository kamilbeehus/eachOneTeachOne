import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            {/* <img className="h-10 w-10 mr-2" src={AvatarLogo} alt="Logo" /> */}
            <span className="md:text-xl tracking-tight">
              EachOne
              <br />
              TeachOne
            </span>
          </div>
          <div className="justify-center space-x-2">
            <Link to="/login" className=" px-1">
              <button className="btn btn-primary"> Login</button>
            </Link>
            <Link to="/Signup" className=" px-1">
              <button className="btn btn-primary">Create an account</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
