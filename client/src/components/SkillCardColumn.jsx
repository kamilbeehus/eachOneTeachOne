import SkillCard from "./SkillCard";

export default function SkillCardColumn() {
  return (
    <>
      <div className="card grid sm:grid-cols-4 grid-cols-2 gap-6">
        <SkillCard
          name="brian"
          shortDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
        <SkillCard
          name="brian"
          shortDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
        <SkillCard
          name="brian"
          shortDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
        <SkillCard
          name="brian"
          shortDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
        <SkillCard
          name="brian"
          shortDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        />
      </div>
    </>
  );
}
