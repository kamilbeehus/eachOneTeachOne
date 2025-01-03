import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentTime } from "../helpers/getCurrentTime";
import { getCurrentDate } from "../helpers/getCurrentDate";
import { postCourse } from "../api/postCourse";
import CloseButton from "./CloseButton";
// import "react-toastify/dist/ReactToastify.css";

interface OfferCourseProps {
  isUserCourse: boolean;
  refreshCourses: () => void;
}

interface CoursePayload {
  title: string;
  description: string;
  skill: string;
  creditsCost: number;
  schedule: {
    startDate: Date;
    endDate: Date;
  };
  maxStudents: number;
}

const OfferCourse: React.FC<OfferCourseProps> = ({
  isUserCourse,
  refreshCourses,
}) => {
  const [skill, setSkill] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(getCurrentDate());
  const [startTime, setStartTime] = useState<string>(getCurrentTime());
  const [endTime, setEndTime] = useState<string>(getCurrentTime(1));
  const [creditsCost, setCreditsCost] = useState<string>("");
  const [maxStudents, setMaxStudents] = useState<string>("");

  const handleSubmit = async (payload: CoursePayload) => {
    try {
      const response = await postCourse(payload);
      toast.success("Your course has been created successfully!");
      console.log(response);

      // Refresh the courses list after successful course creation
      refreshCourses();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course. Please try again.");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission causing a page refresh.

    const payload: CoursePayload = {
      title,
      description,
      skill,
      creditsCost: parseInt(creditsCost, 10),
      maxStudents: parseInt(maxStudents, 10),
      schedule: {
        startDate: new Date(`${date}T${startTime}`),
        endDate: new Date(`${date}T${endTime}`),
      },
    };

    handleSubmit(payload);
    (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
  };

  if (!isUserCourse) {
    return null;
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Offer Course
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="model-box">
          <form method="dialog" onSubmit={handleFormSubmit}>
            <div className="container min-h-screen mx-auto px-2 flex justify-center items-center">
              <div className="card bg-base-100 p-20 shadow-2xl grid grid-cols-1 gap-6 justify-center xs:max-w-xs sm:max-w-sm md:max-w-md max-h-screen lg:max-w-lg overflow-y-auto xl:max-w-xl">
                <CloseButton />
                {/* --- TITLE --- */}
                <div>
                  <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
                    Title
                  </label>
                  <br />
                  <input
                    type="text"
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
                    min={1} // Prevent negative numbers input
                  />
                </div>
                {/* --- MAX STUDENTS --- */}
                <div>
                  <label className="label-text text-primary font-semibold text-sm pb-0 pl-2">
                    Maximum number of students
                  </label>
                  <br />
                  <input
                    type="number"
                    placeholder="Enter the max. number of students"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(e.target.value)}
                    className="input input-bordered w-full"
                    min={1} // Prevent negative numbers input
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
};

export default OfferCourse;
