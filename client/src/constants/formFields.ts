import { CalendarClock, HandCoins, Sprout, UsersRound } from "lucide-react";
import { Wallet } from "lucide-react";
import { BookOpenText } from "lucide-react";
const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email", // Must match the backend field from the User schema
    id: "email", // Must match the backend field from the User schema
    name: "email", // Must match the backend field from the User schema
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];
const signupFields = [
  {
    labelText: "First Name",
    labelFor: "firstName",
    id: "firstName",
    name: "firstName",
    type: "text",
    autoComplete: "firstname",
    isRequired: true,
    placeholder: "First Name",
  },
  {
    labelText: "Last Name",
    labelFor: "lastName",
    id: "lastName",
    name: "lastName",
    type: "text",
    autoComplete: "lastname",
    isRequired: true,
    placeholder: "Last Name",
  },
  {
    labelText: "Email address",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password", // Used for validation only
    id: "confirm-password", // Not sent to the backend
    name: "confirm-password", // Not sent to the backend
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];
const navItems = [
  { label: "How does it work?", href: "#" },
  { label: "Why us?", href: "#" },
  { label: "Testimonials", href: "#" },
];
const LandingWhyUsList = [
  {
    icon: <BookOpenText />,
    text: "Offer and Book courses",
    description:
      "Share your skills and passions by offering a course on our platform.Use your earned credits to book and attend courses offered by other members of the platform. Explore new interests, enhance your skills, and grow through learning from others.",
  },
  {
    icon: <HandCoins />,
    text: "Earn Credits",
    description:
      "For every hour you teach, you earn 1 Credit Point. These points are a testament to your contribution to the community.",
  },
  {
    icon: <CalendarClock />,
    text: "Flexible Learning",
    description:
      "Learn at your own pace and choose from a variety of courses that fit your interests and schedule.",
  },
  {
    icon: <UsersRound />,
    text: "Diverse Community",
    description:
      "Connect with people from different countries, backgrounds and cultures, enriching your learning experience.",
  },
  {
    icon: <Wallet />,
    text: "It is free",
    description:
      "Instead of spending money, you invest your time and knowledge, making education accessible and free for everyone.",
  },
  {
    icon: <Sprout />,
    text: "Personal Growth",
    description:
      "Both teaching and learning foster personal and professional development. Share what you know and gain new skills in return.",
  },
];
export { loginFields, signupFields, navItems, LandingWhyUsList }; //signupFields to be added to the array
