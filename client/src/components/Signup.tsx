import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState(null); // State for storing errors
  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Provide feedback to the user if the passwords do not match
    if (signupState.password !== signupState["confirm-password"]) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    // Check for password length
    if (signupState.password.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const payload = {
      firstName: signupState.firstName,
      lastName: signupState.lastName,
      email: signupState.email,
      password: signupState.password,
    };

    try {
      await createAccount(payload);
      console.log("Account created successfully");
      toast.success("Account created successfully!");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Signup API integration
  const createAccount = async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        payload,
      );
      console.log("User registered successfully :", response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction handleSubmit={handleSubmit} text="Sign Up" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
