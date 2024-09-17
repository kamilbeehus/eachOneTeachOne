import { useState } from "react";
import { getCourseDate } from "../helpers/getCourseDate";
import { getCourseStartTime } from "../helpers/getCourseStartTime";
import { getCourseEndTime } from "../helpers/getCourseEndTime";
import CloseButton from "./CloseButton";
import { useUser } from "../hooks/UserContext";

export default function EditCourse({ course }) {
  const { userId } = useUser(); // Get the user id from the context

  // async function handleSubmit(payload) {
  // try {
  // } catch (e) {
  // console.error(e);
  // }
  // }

  const [skill, setSkill] = useState(course?.skill || "");
  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [date, setDate] = useState(getCourseDate(course));
  const [startTime, setStartTime] = useState(getCourseStartTime(course));
  const [endTime, setEndTime] = useState(getCourseEndTime(course));
  const [creditsCost, setCreditsCost] = useState(course?.creditsCost);

  // const payload = {
  //   title: title,
  //   description: description,
  //   instructorId: userId,
  //   skill: skill,
  //   creditsCost: creditsCost,
  //   schedule: {
  //     startDate: new Date(`${date}T${startTime}`),
  //     endDate: new Date(`${date}T${endTime}`),
  //   },
  // };
  async function handleEditClick() {
    document.getElementById(course._id).showModal();
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleEditClick}>
        Edit
      </button>
      <dialog id={course._id} className="modal">
        <div className="model-box">
          <form
            method="dialog"
            onSubmit={(e) => {
              e.preventDefault(); //prevents form submit on page refresh.
              // handleSubmit(payload); // handle submit, when submit button was pressed.
              document.getElementById(course._id).close();
            }}
          >
            <div className="container min-h-screen mx-auto px-2 flex justify-center items-center">
              <div className="card bg-base-100 p-20 shadow-2xl grid grid-cols-1 gap-6 justify-center xs:max-w-xs sm:max-w-sm md:max-w-md max-h-screen lg:max-w-lg overflow-y-auto xl:max-w-xl">
                <CloseButton modalId={course._id} />
                {/* --- TITLE --- */}
                <div>
                  <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
                    Title
                  </label>
                  <br />
                  <input
                    type="title"
                    placeholder="Enter the title of your course"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                {/* --- DESCRIPTION --- */}
                <div>
                  <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
                    Description
                  </label>
                  <br />
                  <textarea
                    className="textarea textarea-bordered w-full"
                    type="description"
                    placeholder="What do you want to teach?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {/* --- SKILL --- */}
                <div>
                  <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
                    Skill
                  </label>
                  <br />
                  <select
                    type="skill"
                    defaultValue={skill || "defaultValue"}
                    onChange={(e) => setSkill(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="defaultValue" disabled>
                      Pick the skill you want to teach
                    </option>
                    <option value="Music">Music</option>
                    <option value="Languages">Languages</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>
                {/* --- CREDITS COST --- */}
                <div>
                  <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
                    Credits Cost
                  </label>
                  <br />
                  <input
                    type="number"
                    placeholder="Enter the cost in credits"
                    value={creditsCost}
                    onChange={(e) => setCreditsCost(e.target.value)}
                    className="input input-bordered w-full"
                    min="0" // Prevent negative numbers input
                  />
                </div>
                {/* --- DATE --- */}
                <div>
                  <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
                    Date
                  </label>
                  <br />
                  <input
                    type="date"
                    value={date}
                    selected={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                {/* --- START TIME --- */}
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
                {/* --- END TIME --- */}
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
                <div className="h-5"></div>
                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Offer Course
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
