import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage() {
  return (
    <>
      <Header
        heading="Sign Up to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />
      <Signup />
    </>
  );
}
