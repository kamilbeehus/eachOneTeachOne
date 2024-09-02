import raccoonLogo from "../assets/Avatar.png";

export default function CourseCard({
  courseName,
  courseDescription,
  isUserCourse,
}) {
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

          <div className="card-actions justify-end">
            <Edit isUserCourse={isUserCourse} />
          </div>
        </div>
      </div>
    </>
  );
}

function Edit({ isUserCourse }) {
  if (isUserCourse) {
    return <button className="btn btn-primary">Edit</button>;
  } else {
    return <button className="btn btn-primary">Enroll</button>;
  }
}
