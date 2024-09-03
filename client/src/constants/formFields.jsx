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

export { loginFields, signupFields }; //signupFields to be added to the array
