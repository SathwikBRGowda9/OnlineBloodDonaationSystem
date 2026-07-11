import React, { useState, useEffect } from "react";
import {
  FaHeartbeat,
  FaBell,
  FaPhone,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

const BloodRequestsReceived = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, high, medium, low, critical
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token && userId) {
      fetchRequests();
      // Poll for new requests every 30 seconds
      const interval = setInterval(fetchRequests, 30000);
      return () => clearInterval(interval);
    }
  }, [token, userId]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/blood-request/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setRequests(response.data.messages || []);
    } catch (err) {
      console.error("Failed to fetch blood requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-100 border-red-500 text-red-800";
      case "HIGH":
        return "bg-orange-100 border-orange-500 text-orange-800";
      case "MEDIUM":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case "LOW":
        return "bg-green-100 border-green-500 text-green-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency?.toUpperCase()) {
      case "CRITICAL":
        return "🚨";
      case "HIGH":
        return "⚠️";
      case "MEDIUM":
        return "📢";
      case "LOW":
        return "ℹ️";
      default:
        return "📋";
    }
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter(
          (req) => req.urgencyLevel?.toUpperCase() === filter.toUpperCase(),
        );

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading blood requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <FaBell className="inline text-4xl text-red-600 mb-2" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Blood Request Notifications
          </h1>
          <p className="text-gray-600">Your received blood donation requests</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2 justify-center flex-wrap">
          {["all", "critical", "high", "medium", "low"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === level
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests Count */}
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-600">
            Total: {requests.length} • Showing: {filteredRequests.length}
          </p>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaHeartbeat className="mx-auto text-4xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No Requests
            </h2>
            <p className="text-gray-500">
              You have no blood requests at this time. Keep helping save lives!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className={`border-l-4 rounded-lg shadow-lg p-6 bg-white transition hover:shadow-xl ${getUrgencyColor(
                  req.urgencyLevel,
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Hospital Name and Blood Type */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {getUrgencyIcon(req.urgencyLevel)}
                      </span>
                      <h3 className="text-2xl font-bold">{req.hospitalName}</h3>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {req.bloodType}
                      </span>
                    </div>

                    {/* Message */}
                    {req.message && (
                      <p className="text-gray-700 mb-3 text-lg">
                        {req.message}
                      </p>
                    )}

                    {/* Contact Information */}
                    <div className="flex gap-6 mb-3 flex-wrap">
                      {req.email && (
                        <a
                          href={`mailto:${req.email}`}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          <FaEnvelope /> {req.email}
                        </a>
                      )}
                      {req.phoneNumber && (
                        <a
                          href={`tel:${req.phoneNumber}`}
                          className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold"
                        >
                          <FaPhone /> {req.phoneNumber}
                        </a>
                      )}
                    </div>

                    {/* Status and Date */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaCheckCircle className="text-green-600" />
                        Status: {req.status}
                      </span>
                      <span>
                        Received: {new Date(req.createdAt).toLocaleDateString()}{" "}
                        at {new Date(req.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Urgency Badge */}
                  <div className="ml-4">
                    <div
                      className={`px-4 py-2 rounded-lg font-bold text-center whitespace-nowrap`}
                    >
                      {req.urgencyLevel?.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequestsReceived;
