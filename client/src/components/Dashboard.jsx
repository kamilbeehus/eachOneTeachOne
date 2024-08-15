import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import raccoonLogo from "../assets/Raccoon.svg";

export default function Dashboard() {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={raccoonLogo} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Ryan</h2>
          <p>I can be your guide to the food supply!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Teach me</button>
          </div>
        </div>
      </div>
    </>
  );
}
