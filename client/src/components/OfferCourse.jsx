import axios from "axios";

let startDate = new Date("October 15, 2025 05:35:32");
let endDate = new Date("October 15, 2025 06:35:32");

const payload = {
  title: "some Course",
  description: "this is a short description",
  instructorId: "66d411048418b83052893648",
  skill: "Music",
  creditsCost: "1",
  schedule: {
    startDate: startDate,
    endDate: endDate,
  },
};

const getUserById = async (userId) => {
  try {
    console.log("hi from getUserById");
    const response = await axios.get(
      `http://localhost:3000/api/users/${userId}`,
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

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

function handleSubmit(payload) {
  getUserById("66d411048418b83052893648");
  createCourse(payload);
}
export default function OfferCourse() {
  return (
    <div className="container min-h-screen mx-auto px-20 flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault; //prevents form submit on page refresh.
          handleSubmit(payload); // handle submit, when submit button was pressed.
        }}
        className="grid grid-cols-1 gap-6 justify-center w-full max-w-xs"
      >
        <input
          type="title"
          placeholder="title"
          className="input input-bordered"
        />
        <input
          type="description"
          placeholder="description"
          className="input input-bordered"
        />
        <input
          type="skill"
          placeholder="skill"
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
