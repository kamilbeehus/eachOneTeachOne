import Header from "../components/Header";
import Signup from "../components/Signup.tsx";

export default function SignupPage() {
  return (
    <>
      <div className="flex h-screen min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Header
            heading="Sign Up to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/login"
          />
          <Signup />
        </div>
      </div>
    </>
  );
}
