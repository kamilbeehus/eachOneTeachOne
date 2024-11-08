import axios from "axios";
import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../hooks/UserContext.jsx";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  // Get setUserId from the UserContext to update it after login
  // const { setUserId } = useUser();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  // Login API Integration
  const authenticateUser = async () => {
    setIsLoading(true); // Start loading when authentication begins
    try {
      const payload = {
        email: loginState.email,
        password: loginState.password,
      };
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        payload,
        { withCredentials: true }, // Ensures that the cookie (along with the token) is sent with the request
      );

      console.log("Login successful:", response.data);

      // const { _id: userId } = response.data.user;

      // Store the userId in both UserContext and localStorage
      // setUserId(userId); // Update global state with userId
      // localStorage.setItem("userId", userId); // Persist the userId in localStorage

      // Clear any existing error messages
      setError("");

      // Simulate data fetching/loading before redirecting
      setTimeout(() => {
        setIsLoading(false); // Stop loading
        navigate("/home"); // Redirect after the loading ends
      }, 1000); // Simulated delay for smoother transition (adjust as needed)
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
      // TODO: Display error messages to the user in the UI to improve user experience.
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
      setIsLoading(false); // End loading if there's an error
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      {error && <div className="text-error text-sm mt-2">{error}</div>}

      {isLoading ? (
        <div className="text-center mt-4">
          {/* DaisyUI Spinner */}
          <span className="loading loading-spinner loading-lg"></span>
          <p>Logging in...</p>
        </div>
      ) : (
        <>
          <FormExtra />
          <FormAction handleSubmit={handleSubmit} text="Login" />
        </>
      )}
    </form>
  );
}
