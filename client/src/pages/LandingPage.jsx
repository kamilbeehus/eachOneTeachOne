import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HowDoesItWork from "../components/HowDoesItWork";
import WhyUs from "../components/WhyUs";

export default function LandingPage() {
  return (
    <>
    <Navbar/>
    <HowDoesItWork/>
    <WhyUs/>
    </>
  );
}
