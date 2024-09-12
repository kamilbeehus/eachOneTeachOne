import { Link } from "react-router-dom";

export default function OfferCourse({ isUserCourse }) {
  if (isUserCourse) {
    return (
      <Link to="/offercourse">
        <button className="btn btn-primary">Offer Course</button>
      </Link>
    );
  } else {
    null;
  }
}
