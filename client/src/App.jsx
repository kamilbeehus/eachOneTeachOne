import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Error404Page from "./pages/Error404Page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
