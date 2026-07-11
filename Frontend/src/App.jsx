import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import AdminLogin from "./src/pages/AdminLogin";
import DonorForm from "./src/pages/DonorForm";
import AdminDashboard from "./src/pages/AdminDashboard";
import Services from "./src/pages/Services";
import HospitalAuth from "./src/pages/HospitalAuth";
import HospitalForm from "./src/pages/HospitalForm";
import HospitalDashboard from "./src/pages/HospitalDashboard";
import BloodRequestNotification from "./src/pages/BloodRequestNotification";
import BloodRequestsReceived from "./src/pages/BloodRequestsReceived";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donor-form" element={<DonorForm />} />
        <Route path="/hospital-auth" element={<HospitalAuth />} />
        <Route path="/hospital-form" element={<HospitalForm />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/blood-request-notify"
          element={<BloodRequestNotification />}
        />
        <Route path="/blood-requests" element={<BloodRequestsReceived />} />
      </Routes>
    </BrowserRouter>
  );
}
