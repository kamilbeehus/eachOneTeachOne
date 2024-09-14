import LandingNavbar from "../components/LandingNavbar";
import LandingHowDoesItWork from "../components/LandingHowDoesItWork";
import LandingWhyUs from "../components/LandingWhyUs";

export default function LandingPage() {
  return (
    <>
      <div className="bg-gradient-to-r from-secondary/30 to-primary/30 ">
        <LandingNavbar />
        <LandingHowDoesItWork />
        <LandingWhyUs />
      </div>
    </>
  );
}
