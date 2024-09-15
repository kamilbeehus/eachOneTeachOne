import { LandingWhyUsList } from "../constants/formFields";

export default function LandingWhyUs() {
  return (
    <div
      id="whyUs"
      className="relative mt-20 border-b border-neutral-800 min-h-[800px]"
    >
      <div className="text-center">
        <span className="bg-base-300 text-primary rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Why Us?
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          {" "}
          <span className=" bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Why Join Each One Teach One?
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {LandingWhyUsList.map((LandingWhyUsList, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-base-300 text-primary justify-center items-center rounded-full">
                {LandingWhyUsList.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 font-semibold text-xl">
                  {LandingWhyUsList.text}
                </h5>
                <p className="text-md p-2 mb-20 ">
                  {LandingWhyUsList.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
