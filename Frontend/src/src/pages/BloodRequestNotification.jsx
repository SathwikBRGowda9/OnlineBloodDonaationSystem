import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaEnvelope,
  FaMobileAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";

const BloodRequestNotification = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const userEmail = localStorage.getItem("userEmail");

  const [formData, setFormData] = useState({
    userId: "",
    hospitalId: "",
    hospitalName: "",
    bloodType: "O+",
    urgencyLevel: "HIGH",
    message: "",
    phoneNumber: "",
    email: "",
    sendEmail: true,
    sendSMS: false,
  });

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch available donors
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/donor/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonors(response.data);
    } catch (err) {
      console.error("Failed to fetch donors:", err);
      setErrorMessage("Could not load donors list");
    }
  };

  const handleSelectDonor = (donor) => {
    setFormData({
      ...formData,
      userId: donor.id,
      email: donor.email,
      phoneNumber: donor.phoneNumber || "",
      hospitalName: "Your Hospital", // Should come from hospital profile
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId) {
      setErrorMessage("Please select a donor");
      return;
    }

    if (!formData.email && !formData.phoneNumber) {
      setErrorMessage("Please provide at least email or phone number");
      return;
    }

    if (!formData.sendEmail && !formData.sendSMS) {
      setErrorMessage("Select at least one notification method");
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/blood-request/send",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.status === "success") {
        setSuccessMessage("✅ Blood request notification sent successfully!");
        setFormData({
          userId: "",
          hospitalId: "",
          hospitalName: "",
          bloodType: "O+",
          urgencyLevel: "HIGH",
          message: "",
          phoneNumber: "",
          email: "",
          sendEmail: true,
          sendSMS: false,
        });
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(response.data.message || "Failed to send notification");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Error sending notification",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <FaHeartbeat className="inline text-4xl text-red-600 mb-2" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Blood Request Notification
          </h1>
          <p className="text-gray-600">
            Send urgent blood requests to registered donors
          </p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg flex items-center">
            <FaCheckCircle className="mr-3 text-xl" />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg flex items-center">
            <FaTimesCircle className="mr-3 text-xl" />
            {errorMessage}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Donors List */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Available Donors
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {donors.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No donors available
                </p>
              ) : (
                donors.map((donor) => (
                  <button
                    key={donor.id}
                    onClick={() => handleSelectDonor(donor)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      formData.userId === donor.id
                        ? "bg-red-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    <div className="font-semibold">
                      {donor.name || donor.email}
                    </div>
                    <div className="text-sm opacity-80">
                      {donor.bloodType || "Type unknown"}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Request Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Request Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Donor Info */}
              {formData.email && (
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600">Sending to:</p>
                  <p className="font-semibold text-gray-800">
                    {formData.email}
                  </p>
                  {formData.phoneNumber && (
                    <p className="text-sm text-gray-600">
                      {formData.phoneNumber}
                    </p>
                  )}
                </div>
              )}

              {/* Blood Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Blood Type Needed
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                >
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Urgency Level
                </label>
                <select
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter details about the blood request..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              {/* Notification Methods */}
              <div className="border-t pt-4">
                <label className="block text-gray-700 font-semibold mb-3">
                  Notification Methods
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sendEmail"
                      checked={formData.sendEmail}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <FaEnvelope className="ml-3 text-gray-600" />
                    <span className="ml-2 text-gray-700">Send Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sendSMS"
                      checked={formData.sendSMS}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <FaMobileAlt className="ml-3 text-gray-600" />
                    <span className="ml-2 text-gray-700">Send SMS</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
              >
                {loading ? "Sending..." : "🩸 Send Blood Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestNotification;
