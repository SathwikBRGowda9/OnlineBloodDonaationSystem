import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DonorForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    city: "",
    latitude: "",
    longitude: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
        alert("📍 Location captured ✅");
      },
      () => alert("❌ Location access denied")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("⚠ Please login first");
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/donors",
        {
          ...form,
          latitude: Number(form.latitude),
          longitude: Number(form.longitude)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Donor added successfully");

      setForm({
        name: "",
        bloodGroup: "",
        phone: "",
        city: "",
        latitude: "",
        longitude: ""
      });

    } catch (err) {
      alert("❌ Error saving donor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-red-200 to-pink-300">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-lg hover:bg-black transition"
      >
        ⬅ Back
      </button>

      {/* 💎 CARD */}
      <div className="bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[420px] text-center border border-white/40">

        {/* 🩸 ICON */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
            🩸
          </div>
          <p className="text-gray-700 mt-2 text-sm font-medium">
            Donate Blood, Save Life ❤️
          </p>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Donor Registration
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            name="bloodGroup"
            placeholder="Blood Group (A+, O-, etc.)"
            value={form.bloodGroup}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* 📍 LOCATION */}
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-blue-500 py-3 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
          >
            📍 Get Current Location
          </button>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-red-500 py-3 rounded-lg text-white font-bold hover:bg-red-600 transition hover:scale-105"
          >
            Submit Donor
          </button>
        </form>
      </div>
    </div>
  );
}