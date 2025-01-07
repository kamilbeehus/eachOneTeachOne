import { LandingWhyUsList } from "../constants/formFields";

export default function LandingWhyUs() {
  return (
    <div
      id="whyUs"
      className="relative mt-20 min-h-[800px] border-b border-neutral-800"
    >
      <div className="text-center">
        <span className="h-6 rounded-full bg-accent px-2 py-1 text-sm font-medium uppercase text-primary">
          Why Us?
        </span>
        <h2 className="mt-10 text-3xl tracking-wide sm:text-5xl lg:mt-20 lg:text-6xl">
          {" "}
          <span className="text-primary">Why Join Each One Teach One?</span>
        </h2>
      </div>
      <div className="mt-10 flex flex-wrap lg:mt-20">
        {LandingWhyUsList.map((LandingWhyUsList, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="mx-6 flex h-10 w-10 items-center justify-center rounded-full bg-accent p-2 text-primary">
                {LandingWhyUsList.icon}
              </div>
              <div>
                <h5 className="mb-6 mt-1 text-xl font-semibold">
                  {LandingWhyUsList.text}
                </h5>
                <p className="text-md mb-20 p-2">
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
