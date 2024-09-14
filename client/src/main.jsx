import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./hooks/UserContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <UserProvider>
          <App />
      </UserProvider>
  </React.StrictMode>,
);
