import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiInstance";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

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

      // Make login request to authenticate user and store token in cookies
      await api.post("/auth/login", payload);
      console.log("User logged in successfully!");

      // Fetch authenticated user data from /auth/me endpoint
      const { data } = await api.get("/auth/me");
      console.log("User data retrieved :", data.user);

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
