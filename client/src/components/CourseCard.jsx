import raccoonLogo from "../assets/Raccoon.svg";

export default function CourseCard({ courseName, courseDescription }) {
  return (
    <>
      <div className="card  bg-base-100 shadow-xl lg:card-side">
        <figure>
          {/* Todo: insert teachers profile photo */}
          <img src={raccoonLogo} alt="raccoon" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{courseName}</h2>
          <p>{courseDescription}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Teach me</button>
          </div>
        </div>
      </div>
    </>
  );
}
