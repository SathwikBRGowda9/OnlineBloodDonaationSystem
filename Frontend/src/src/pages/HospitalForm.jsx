import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalForm() {
  const navigate = useNavigate();

  const hospitalName = localStorage.getItem("hospitalName");

  const [form, setForm] = useState({
    hospitalName: hospitalName || "",
    patientName: "",
    bloodGroup: "",
    city: "",
    contact: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(() => {
        alert("Request Submitted ✅");

        setForm({
          hospitalName: hospitalName || "",
          patientName: "",
          bloodGroup: "",
          city: "",
          contact: ""
        });
      })
      .catch(() => alert("Error ❌"));
  };

  const handleLogout = () => {
    localStorage.removeItem("hospitalName");
    navigate("/hospital-auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-pink-500 to-orange-500">

      {/* 🔙 BACK */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 bg-black/70 text-white px-5 py-2 rounded-xl hover:bg-black transition"
      >
        ← Back
      </button>

      {/* 🔓 LOGOUT */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 bg-black/70 text-white px-5 py-2 rounded-xl hover:bg-black transition"
      >
        Logout
      </button>

      {/* 💎 CARD */}
      <div className="w-[420px] p-8 rounded-3xl backdrop-blur-xl bg-white/20 shadow-2xl border border-white/30 animate-fadeIn">

        {/* ❤️ ICON */}
        <div className="flex justify-center mb-4 text-4xl animate-bounce">
          🩸
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Blood Request Form
        </h2>

        {/* 🏥 HOSPITAL */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-3">🏥</span>
          <input
            name="hospitalName"
            value={form.hospitalName}
            disabled
            className="w-full pl-10 p-3 rounded-xl bg-white/80 outline-none"
          />
        </div>

        {/* 👤 PATIENT */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-3">👤</span>
          <input
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            className="w-full pl-10 p-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* 🩸 BLOOD */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-3">🩸</span>
          <input
            name="bloodGroup"
            placeholder="Blood Group (A+, O-)"
            value={form.bloodGroup}
            onChange={handleChange}
            className="w-full pl-10 p-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* 📍 CITY */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-3">📍</span>
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full pl-10 p-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* 📞 CONTACT */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-3">📞</span>
          <input
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="w-full pl-10 p-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* 🚀 SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg hover:scale-105 transition"
        >
          Submit Request 🚀
        </button>

        {/* 🏥 DASHBOARD */}
        <button
          onClick={() => navigate("/hospital-dashboard")}
          className="w-full py-3 mt-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:scale-105 transition"
        >
          Go to Dashboard 🏥
        </button>
      </div>

      {/* 🎬 ANIMATIONS */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 1s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}