import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavbarDropdown from "@/components/NavbarDropdown";

export default function Navbar() {
  return (
    <nav className="z-50 border-b py-3">
      <div className="flex justify-between">
        <Link to="/home" className="px-4">
          <Button variant="outline">Home</Button>
        </Link>
        <NavbarDropdown />
      </div>
    </nav>
  );
}
