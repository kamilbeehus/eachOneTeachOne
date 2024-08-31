import axios from "axios";
import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
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

      console.log("Login succesful:", response.data);
      // Redirect to home page after successful login
      navigate("/home");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
      // TODO: Display error messages to the user in the UI to improve user experience.
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

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
