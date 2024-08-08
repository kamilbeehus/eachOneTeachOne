import { NavLink } from "react-router-dom";
export default function Header() {
    return (
        <div>
            <nav className="flex justify-between items-center mb-6">
                <NavLink to="/">
                    <button className="btn btn-primary">how a Dashboard might look like
                    </button>
                </NavLink>

                <NavLink to="/login">
                    <button className="btn btn-primary">how a Login Page might look like
                    </button>
                </NavLink>
            </nav>
        </div>
    );
}