import { useState } from "react";
import { getCurrentTime } from "../helpers/getCurrentTime";
import { getCurrentDate } from "../helpers/getCurrentDate";
import { postCourse } from "../helpers/postCourse";
import CloseButton from "./CloseButton";

export default function OfferCourse({ isUserCourse }) {
  async function handleSubmit(payload) {
    try {
      const response = await postCourse(payload); // Something is not working
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  const [skill, setSkill] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState(getCurrentTime(1));

  const payload = {
    title: title,
    description: description,
    instructorId: "66e5932d4084e0310cd7781e",
    skill: skill,
    creditsCost: "1",
    schedule: {
      startDate: new Date(`${date}T${startTime}`),
      endDate: new Date(`${date}T${endTime}`),
    },
  };

  if (isUserCourse) {
    return (
      <>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Offer Course
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="model-box">
            <form
              method="dialog"
              onSubmit={(e) => {
                e.preventDefault(); //prevents form submit on page refresh.
                handleSubmit(payload); // handle submit, when submit button was pressed.
                document.getElementById("my_modal_3").close();
              }}
            >
              <div className="container min-h-screen mx-auto px-2 flex justify-center items-center">
                <div className="card bg-base-100 p-20 shadow-2xl grid grid-cols-1 gap-6 justify-center xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <CloseButton />
                  {/* --- TITLE --- */}
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
                      defaultValue="defaultValue"
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
  } else {
    null;
  }
}
