import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalDashboard() {
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ EDIT STATE
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();
  const hospitalName = localStorage.getItem("hospitalName");

  /////////////////////////////////////////////////////////
  // 🔄 FETCH REQUESTS
  /////////////////////////////////////////////////////////
  const fetchRequests = () => {
    fetch("http://localhost:8080/api/requests")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          (r) => r.hospitalName === hospitalName
        );
        setRequests(filtered);
      });
  };

  /////////////////////////////////////////////////////////
  // 🔄 FETCH DONORS
  /////////////////////////////////////////////////////////
  const fetchDonors = () => {
    fetch("http://localhost:8080/api/donors")
      .then(res => res.json())
      .then(data => setDonors(data))
      .catch(err => console.error(err));
  };

  /////////////////////////////////////////////////////////
  // 🔍 SEARCH
  /////////////////////////////////////////////////////////
  const handleSearch = () => {
    if (!search.trim()) {
      fetchDonors();
      return;
    }

    fetch(
      `http://localhost:8080/api/donors/search?bloodGroup=${encodeURIComponent(search)}`
    )
      .then(res => res.json())
      .then(data => setDonors(data))
      .catch(err => console.error(err));
  };

  /////////////////////////////////////////////////////////
  // 🚀 LOAD
  /////////////////////////////////////////////////////////
  useEffect(() => {
    if (!hospitalName) {
      alert("⚠ Please login");
      navigate("/hospital-auth");
      return;
    }

    fetchRequests();
    fetchDonors();
  }, []);

  /////////////////////////////////////////////////////////
  // ❌ DELETE REQUEST
  /////////////////////////////////////////////////////////
  const deleteRequest = (id) => {
    fetch(`http://localhost:8080/api/requests/${id}`, {
      method: "DELETE"
    }).then(fetchRequests);
  };

  /////////////////////////////////////////////////////////
  // ❌ DELETE DONOR
  /////////////////////////////////////////////////////////
  const deleteDonor = (id) => {
    fetch(`http://localhost:8080/api/donors/${id}`, {
      method: "DELETE"
    }).then(fetchDonors);
  };

  /////////////////////////////////////////////////////////
  // ✏️ EDIT
  /////////////////////////////////////////////////////////
  const handleEdit = (r) => {
    setEditData(r);
  };

  /////////////////////////////////////////////////////////
  // 💾 UPDATE
  /////////////////////////////////////////////////////////
  const updateRequest = () => {
    fetch(`http://localhost:8080/api/requests/${editData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    })
      .then(() => {
        alert("Updated Successfully ✅");
        setEditData(null);
        fetchRequests();
      })
      .catch(() => alert("Update Failed ❌"));
  };

  /////////////////////////////////////////////////////////
  // 🎨 UI
  /////////////////////////////////////////////////////////
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-[220px] bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col p-5 shadow-xl">

        <h2 className="text-xl font-bold mb-6">🏥 Hospital</h2>

        <p className="hover:bg-white/20 p-2 rounded cursor-pointer">Dashboard</p>
        <p className="hover:bg-white/20 p-2 rounded cursor-pointer">Requests</p>
        <p className="hover:bg-white/20 p-2 rounded cursor-pointer">Donors</p>

        <button
          className="mt-auto bg-black py-2 rounded-lg hover:bg-red-600 transition"
          onClick={() => {
            localStorage.clear();
            navigate("/hospital-auth");
          }}
        >
          Logout
        </button>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 p-6 overflow-auto">

        <h2 className="text-2xl font-bold mb-4 animate-fadeIn">
          Hospital Dashboard
        </h2>

        {/* 💳 CARDS */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="bg-blue-600 text-white p-5 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <h3>Total Requests</h3>
            <p className="text-2xl font-bold">{requests.length}</p>
          </div>

          <div className="bg-blue-600 text-white p-5 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <h3>Total Donors</h3>
            <p className="text-2xl font-bold">{donors.length}</p>
          </div>
        </div>

        {/* 🩸 REQUEST TABLE */}
        <div className="bg-white p-5 rounded-xl shadow-md mb-6 animate-slideUp">
          <h3 className="text-lg font-semibold mb-3">Blood Requests</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Blood</th>
                  <th>City</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="text-center border-b hover:bg-gray-100">
                    <td>{r.id}</td>
                    <td>{r.patientName}</td>
                    <td className="text-red-600 font-bold">{r.bloodGroup}</td>
                    <td>{r.city}</td>
                    <td>{r.contact}</td>

                    <td className="flex justify-center gap-2 py-2">
                      <button
                        className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
                        onClick={() => handleEdit(r)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                        onClick={() => deleteRequest(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔍 SEARCH */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input
            placeholder="Search Blood Group (A+, O-...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-lg shadow-sm"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search 🔍
          </button>

          <button
            onClick={fetchDonors}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* 👥 DONORS */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Available Donors</h3>

          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Blood</th>
                <th>Phone</th>
                <th>City</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {donors.map((d) => (
                <tr key={d.id} className="text-center border-b">
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td className="text-red-600">{d.bloodGroup}</td>
                  <td>{d.phone}</td>
                  <td>{d.city}</td>
                  <td>{d.latitude}</td>
                  <td>{d.longitude}</td>

                  <td>
                    <button
                      className="bg-red-500 px-3 py-1 rounded text-white"
                      onClick={() => deleteDonor(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✏️ EDIT MODAL */}
        {editData && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow w-[300px]">

              <h3 className="mb-3 font-bold">Edit Request</h3>

              <input
                className="w-full border p-2 mb-2"
                value={editData.patientName}
                onChange={(e) =>
                  setEditData({ ...editData, patientName: e.target.value })
                }
              />

              <input
                className="w-full border p-2 mb-2"
                value={editData.bloodGroup}
                onChange={(e) =>
                  setEditData({ ...editData, bloodGroup: e.target.value })
                }
              />

              <input
                className="w-full border p-2 mb-2"
                value={editData.city}
                onChange={(e) =>
                  setEditData({ ...editData, city: e.target.value })
                }
              />

              <input
                className="w-full border p-2 mb-3"
                value={editData.contact}
                onChange={(e) =>
                  setEditData({ ...editData, contact: e.target.value })
                }
              />

              <button
                onClick={updateRequest}
                className="bg-green-600 text-white px-4 py-2 mr-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditData(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
    
  );
}
