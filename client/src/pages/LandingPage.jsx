import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <>
      <h2 className="flex justify-center text-primary font-bold">
        hello from LandingPage
      </h2>
      <div className="flex justify-center">
        <button className="m-4 btn btn-secondary">
          <Link to="/login">LoginPage</Link>
        </button>
        <button className="m-4 btn btn-secondary">
          <Link to="/home">HomePage</Link>
        </button>
      </div>
    </>
  );
}
