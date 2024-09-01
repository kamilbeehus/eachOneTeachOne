// import raccoonLogo from "../assets/Raccoon.svg";
import raccoonLogo from "../assets/Avatar.png";

export default function CourseCard({ courseName, courseDescription }) {
  return (
    <>
      <div className="card bg-base-100 shadow-xl max-w-64">
        <figure>
          {/* Todo: insert teachers profile photo */}
          <img src={raccoonLogo} alt="raccoon" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{courseName}</h2>
          <p>{courseDescription}</p>
          <div className="card-actions justify-between">
            <button className="btn btn-primary">Enroll</button>
          </div>
        </div>
      </div>
    </>
  );
}
