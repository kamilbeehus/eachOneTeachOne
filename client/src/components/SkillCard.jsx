import raccoonLogo from "../assets/Raccoon.svg";

export default function SkillCard({ name, shortDescription }) {
  return (
    <>
      <div className="card  bg-base-100 shadow-xl lg:card-side">
        <figure>
          <img src={raccoonLogo} alt="raccoon" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{shortDescription}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Teach me</button>
          </div>
        </div>
      </div>
    </>
  );
}
