import LandingNavbar from "../components/LandingNavbar";
import LandingHowDoesItWork from "../components/LandingHowDoesItWork";
import LandingWhyUs from "../components/LandingWhyUs";

export default function LandingPage() {
  return (
    <div className="bg-amber-50">
      <LandingNavbar />
      <LandingHowDoesItWork />
      <LandingWhyUs />
    </div>
  );
}
