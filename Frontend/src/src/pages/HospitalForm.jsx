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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-50 via-pink-100 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.18),_transparent_28%)]" />
      <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-b from-pink-200/80 to-transparent blur-3xl" />

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-700 shadow-lg shadow-red-200/40 transition hover:bg-white"
      >
        ← Back
      </button>

      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-700 shadow-lg shadow-red-200/40 transition hover:bg-white"
      >
        Logout
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-2xl shadow-pink-200/30 backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-white shadow-xl shadow-red-200/40">
              <span className="text-xl">🩸</span>
              <span className="font-semibold">Hospital blood request</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Submit your urgent blood request</h1>
              <p className="mt-3 max-w-2xl text-gray-600">
                Fill in the patient details and contact info so donors can respond fast. This form retains your hospital name from login.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-red-50 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Fast response</h3>
                <p className="mt-2 text-sm text-gray-500">Requests are sent instantly to the donor network.</p>
              </div>
              <div className="rounded-3xl bg-red-50 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Verified hospitals</h3>
                <p className="mt-2 text-sm text-gray-500">Your hospital identity is preserved and trusted by donors.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-gray-200 bg-white p-8 shadow-inner shadow-pink-100/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request form</h2>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Hospital</label>
              <input
                name="hospitalName"
                value={form.hospitalName}
                disabled
                className="w-full rounded-3xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                name="patientName"
                placeholder="Patient Name"
                value={form.patientName}
                onChange={handleChange}
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <input
                name="bloodGroup"
                placeholder="A+, O-, B+"
                value={form.bloodGroup}
                onChange={handleChange}
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                name="contact"
                placeholder="Contact Number"
                value={form.contact}
                onChange={handleChange}
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div className="mt-6 grid gap-4">
              <button
                onClick={handleSubmit}
                className="w-full rounded-3xl bg-gradient-to-r from-red-600 to-pink-600 px-5 py-3 text-white text-lg font-semibold shadow-lg shadow-red-200/40 transition hover:from-red-700 hover:to-pink-700"
              >
                Submit Request 🚀
              </button>
              <button
                onClick={() => navigate("/hospital-dashboard")}
                className="w-full rounded-3xl border border-gray-300 bg-white px-5 py-3 text-gray-800 text-lg font-semibold transition hover:bg-gray-50"
              >
                Go to Dashboard 🏥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}