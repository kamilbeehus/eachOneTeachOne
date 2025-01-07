import { toast, ToastContainer } from "react-toastify";
import { getCurrentTime } from "../helpers/getCurrentTime";
import { getCurrentDate } from "../helpers/getCurrentDate";
// import { getCurrentUser } from "../api/getCurrentUser";
import { postCourse } from "../api/postCourse";
import CloseButton from "./CloseButton";

import { useState } from "react";

import { DatePickerDemo } from "./DatePickerDemo";

// import "react-toastify/dist/ReactToastify.css";

export default function OfferCourse({
  isUserCourse,
  refreshCourses,
}: {
  isUserCourse: boolean;
  refreshCourses: any;
}) {
  async function handleSubmit(payload) {
    try {
      const response = await postCourse(payload);
      toast.success("Your course has been created successfully!");
      console.log(response);

      // Refresh the courses list after successful course creation
      refreshCourses();
    } catch (e) {
      console.error(e);
      toast.error("Failed to create course. Please try again.");
    }
  }

  const [skill, setSkill] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState(getCurrentTime(1));
  const [creditsCost, setCreditsCost] = useState("");
  const [maxStudents, setMaxStudents] = useState("");

  const payload = {
    title: title,
    description: description,
    skill: skill,
    creditsCost: creditsCost,
    maxStudents: maxStudents,
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
              <div className="container mx-auto flex min-h-screen items-center justify-center px-2">
                <div className="xs:max-w-xs card grid max-h-screen grid-cols-1 justify-center gap-6 overflow-y-auto bg-base-100 p-20 shadow-2xl sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <CloseButton />
                  {/* --- TITLE --- */}
                  <div>
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
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
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
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
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
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
                  {/* --- CREDITS COST --- */}
                  <div>
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
                      Credits Cost
                    </label>
                    <br />
                    <input
                      type="number"
                      placeholder="Enter the cost in credits"
                      value={creditsCost}
                      onChange={(e) => setCreditsCost(e.target.value)}
                      className="input input-bordered w-full"
                      min="1" // Prevent negative numbers input
                    />
                  </div>
                  {/* --- MAX STUDENTS --- */}
                  <div>
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
                      Maximum number of students
                    </label>
                    <br />
                    <input
                      type="number"
                      placeholder="Enter the max. number of students"
                      value={maxStudents}
                      onChange={(e) => setMaxStudents(e.target.value)}
                      className="input input-bordered w-full"
                      min="1" // Prevent negative numbers input
                    />
                  </div>
                  {/* --- DATE --- */}
                  <div>
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
                      Date
                    </label>
                    <br />
                    <DatePickerDemo></DatePickerDemo>
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
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
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
                    <label className="label-text pb-0 pl-2 text-sm font-semibold text-primary">
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
        <ToastContainer />
      </>
    );
  } else {
    return null;
  }
}
