import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./components/Auth";
import {Dashboard} from "./components/dashboard"; 
import { AdminDashboard } from "./components/admin-dashboard";
import { LandingPage } from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Auth type="signup" />} />
        <Route path="/signin" element={<Auth type="signin" />} />
        <Route path="/login" element={<Auth type="signin" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard"element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;