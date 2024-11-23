import { Link } from "react-router-dom";
export default function SettingsPage() {
  return (
    <>
      <div>hello from setting</div>
      <Link to="/home">
        <button className="btn btn-primary">home</button>
      </Link>
    </>
  );
}
