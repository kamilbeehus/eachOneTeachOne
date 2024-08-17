import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <h2 className="flex justify-center text-primary font-bold">
        hello from HomePage
      </h2>
      <div className="flex justify-center">
        <button className="m-4 btn btn-secondary">
          <Link to="/login">LoginPage</Link>
        </button>
        <button className="m-4 btn btn-secondary">
          <Link to="/">LandingPage</Link>
        </button>
      </div>
    </>
  );
}
