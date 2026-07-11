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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-50 via-pink-100 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.18),_transparent_30%)]" />
      <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-b from-pink-200/80 to-transparent blur-3xl" />

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg shadow-red-200/50 transition hover:bg-white"
      >
        ⬅ Back
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-pink-200/30 backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-white shadow-xl shadow-red-200/50">
              <span className="text-xl">🩸</span>
              <span className="font-semibold">Donor Registration</span>
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Join the BloodLink donor network.</h1>
              <p className="mt-4 max-w-xl text-gray-600">
                Complete your donor profile and help hospitals connect with lifesaving blood supplies faster.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1 text-left">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-sm font-medium text-gray-700">Blood Group</label>
                  <input
                    name="bloodGroup"
                    placeholder="A+, O-, B+, etc."
                    value={form.bloodGroup}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1 text-left">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-sm font-medium text-gray-700">Location Coordinates</label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="latitude"
                    placeholder="Latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  />
                  <input
                    name="longitude"
                    placeholder="Longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  />
                </div>
                <p className="text-xs text-gray-500">Use the button below to capture your current location automatically.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={getLocation}
                  className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
                >
                  📍 Capture Location
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200/50 transition hover:from-red-600 hover:to-pink-600"
                >
                  Submit Donor
                </button>
              </div>
            </form>
          </div>

          <aside className="rounded-[1.75rem] border border-gray-200 bg-gradient-to-b from-red-50 to-white p-8 shadow-lg shadow-pink-200/20">
            <div className="mb-6 rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold">Why your donation matters</h2>
              <p className="mt-3 text-sm text-white/90">
                Every donor helps hospitals maintain critical blood stock and saves up to 3 lives per donation.
              </p>
            </div>

            <div className="space-y-5 text-gray-700">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold">Fast registration</h3>
                <p className="text-sm text-gray-500">Complete the form quickly and have your profile ready for hospital requests.</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold">Verified donor support</h3>
                <p className="text-sm text-gray-500">Your details help hospitals reach you immediately when your blood type is needed.</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold">Safe and trusted</h3>
                <p className="text-sm text-gray-500">We keep your data secure while enabling lifesaving donations.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
