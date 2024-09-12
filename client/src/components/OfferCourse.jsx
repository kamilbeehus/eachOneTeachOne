import axios from "axios";
import { useState } from "react";
import { getCurrentTime } from "../helpers/getCurrentTime";
// const getUserById = async (userId) => {
//   try {
//     console.log("hi from getUserById");
//     const response = await axios.get(
//       `http://localhost:3000/api/users/${userId}`,
//     );
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// };

const createCourse = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/courses/create/",
      payload,
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

// function handleSubmit(payload) {
//   createCourse(payload);
// }

function printSubmit(payload, endTime) {
  console.log(payload);
  console.log(endTime);
}

export default function OfferCourse() {
  const [skill, setSkill] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState(getCurrentTime(1));

  const payload = {
    title: title,
    description: description,
    instructorId: "66d411048418b83052893648",
    skill: skill,
    creditsCost: "1",
    schedule: {
      startDate: new Date("October 15, 2025 05:35:32"),
      endDate: new Date("October 15, 2025 06:35:32"),
    },
  };
  return (
    <div className="container min-h-screen mx-auto px-2 flex justify-center items-center">
      <div className="card bg-base-100 p-20 shadow-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault; //prevents form submit on page refresh.
            printSubmit(payload, endTime); // handle submit, when submit button was pressed.
          }}
          className="grid grid-cols-1 gap-6 justify-center max-w-xs"
        >
          <div>
            <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
              Title
            </label>
            <br />
            <input
              type="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
              Description
            </label>
            <br />
            <input
              type="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
              Skill
            </label>
            <br />
            <input
              type="skill"
              placeholder="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
              Date
            </label>
            <br />
            <input
              type="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
              Start Time
            </label>
            <br />
            <input
              type="time"
              value={startTime}
              selected={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
              End Time
            </label>
            <br />
            <input
              type="time"
              value={endTime}
              selected={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Offer Course
          </button>
        </form>
      </div>
    </div>
  );
}
