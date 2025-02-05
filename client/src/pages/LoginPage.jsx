import Header from "../components/Header.tsx";
import Login from "../components/Login";

export default function LoginPage() {
  return (
    <>
      <div className="flex h-screen min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Header
            heading="Login to your Each One Teach One Account"
            paragraph="Don't have an account yet? "
            linkName="Sign Up"
            linkUrl="/signup"
          />
          <Login />
        </div>
      </div>
    </>
  );
}
