import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Error404Page from "./pages/Error404Page";
import UserCoursePage from "./pages/UserCoursePage";
// import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="min-h-screen bg-gradient-to-r from-secondary/30 to-primary/30">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/usercourses" element={<UserCoursePage />} />
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </BrowserRouter>
        <Toaster></Toaster>
      </div>
    </div>
  );
}

export default App;
