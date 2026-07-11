import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalDashboard() {
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ EDIT STATE
  const [editData, setEditData] = useState(null);

  // 💳 PAYMENT STATE
  const [paymentModal, setPaymentModal] = useState(false);
  const [activeDonor, setActiveDonor] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");

  const navigate = useNavigate();
  const hospitalName = localStorage.getItem("hospitalName");
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

  /////////////////////////////////////////////////////////
  // 🔄 FETCH REQUESTS
  /////////////////////////////////////////////////////////
  const fetchRequests = () => {
    fetch("http://localhost:8080/api/requests")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((r) => r.hospitalName === hospitalName);
        setRequests(filtered);
      });
  };

  /////////////////////////////////////////////////////////
  // 🔄 FETCH DONORS
  /////////////////////////////////////////////////////////
  const fetchDonors = () => {
    fetch("http://localhost:8080/api/donors")
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch((err) => console.error(err));
  };

  /////////////////////////////////////////////////////////
  // � FETCH PAYMENTS
  /////////////////////////////////////////////////////////
  const fetchPayments = () => {
    fetch(
      `http://localhost:8080/api/payments?hospitalName=${encodeURIComponent(
        hospitalName,
      )}`,
    )
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error(err));
  };

  /////////////////////////////////////////////////////////
  // �🔍 SEARCH
  /////////////////////////////////////////////////////////
  const handleSearch = () => {
    if (!search.trim()) {
      fetchDonors();
      return;
    }

    fetch(
      `http://localhost:8080/api/donors/search?bloodGroup=${encodeURIComponent(search)}`,
    )
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch((err) => console.error(err));
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
    fetchPayments();
  }, []);

  /////////////////////////////////////////////////////////
  // ❌ DELETE REQUEST
  /////////////////////////////////////////////////////////
  const deleteRequest = (id) => {
    fetch(`http://localhost:8080/api/requests/${id}`, {
      method: "DELETE",
    }).then(fetchRequests);
  };

  /////////////////////////////////////////////////////////
  // ❌ DELETE DONOR
  /////////////////////////////////////////////////////////
  const deleteDonor = (id) => {
    fetch(`http://localhost:8080/api/donors/${id}`, {
      method: "DELETE",
    }).then(fetchDonors);
  };

  /////////////////////////////////////////////////////////
  // 💸 OPEN PAYMENT FLOW
  /////////////////////////////////////////////////////////
  const openPaymentModal = (donor) => {
    setActiveDonor(donor);
    setPaymentAmount("");
    setPaymentNote("");
    setPaymentModal(true);
  };

  /////////////////////////////////////////////////////////
  // 💸 PAY DONOR
  /////////////////////////////////////////////////////////
  const payDonor = () => {
    if (!activeDonor) return;
    const amount = Number(paymentAmount);

    if (!amount || amount <= 0) {
      alert("Enter a valid payment amount.");
      return;
    }

    fetch("http://localhost:8080/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donorId: activeDonor.id,
        hospitalName,
        amount,
        note: paymentNote,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Payment recorded successfully ✅");
        setPaymentModal(false);
        fetchPayments();
      })
      .catch(() => alert("Payment failed. Please try again."));
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex flex-col md:flex-row">
        {/* 🔥 SIDEBAR */}
        <aside className="w-full md:w-80 bg-slate-900/95 border-r border-slate-800 p-7 shadow-[0_35px_60px_-15px_rgba(15,23,42,0.85)]">
          <div className="mb-8">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-3xl bg-linear-to-br from-cyan-400 to-sky-500 text-slate-950 text-xl font-bold shadow-lg">
              H
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              Hospital Dashboard
            </h2>
            <p className="text-slate-400 leading-6">
              Manage requests, donors and operations from a single premium
              panel.
            </p>
          </div>

          <nav className="mt-10 space-y-2 text-slate-300">
            <button className="w-full text-left rounded-2xl px-4 py-3 hover:bg-slate-800 transition">
              Dashboard
            </button>
            <button className="w-full text-left rounded-2xl px-4 py-3 hover:bg-slate-800 transition">
              Requests
            </button>
            <button className="w-full text-left rounded-2xl px-4 py-3 hover:bg-slate-800 transition">
              Donors
            </button>
          </nav>

          <div className="mt-auto pt-6">
            <button
              className="w-full rounded-2xl bg-linear-to-r from-rose-500 via-red-600 to-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-xl hover:opacity-95 transition"
              onClick={() => {
                localStorage.clear();
                navigate("/hospital-auth");
              }}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* 🔥 MAIN */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                Premium Control
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Hospital Operations
              </h1>
              <p className="mt-2 max-w-2xl text-slate-400">
                Review blood requests, monitor donor availability, and keep your
                hospital supply aligned with demand.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
              <p className="text-sm uppercase text-slate-500">Logged in as</p>
              <p className="mt-2 text-xl font-semibold text-white">
                {hospitalName || "Hospital User"}
              </p>
            </div>
          </div>

<div className="grid gap-5 xl:grid-cols-3">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                    Requests
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold text-white">
                    {requests.length}
                  </h2>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300">
                  📋
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Filtered to your hospital only, so you can focus on the cases
                that matter.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                    Donors
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold text-white">
                    {donors.length}
                  </h2>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                  🩸
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                All available donors are shown here for quick reference and
                outreach.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                    Total Payments
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold text-white">
                    ₹{totalPaid.toFixed(2)}
                  </h2>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-500/15 text-amber-300">
                  💳
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Track all hospital payments made to donors in one place.
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-4xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Blood Requests
                </h3>
                <p className="mt-1 text-slate-400">
                  Manage open requests and update them as the situation evolves.
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
                {requests.length} active request
                {requests.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/80">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-4 py-4 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Blood
                    </th>
                    <th className="px-4 py-4 uppercase tracking-wider">City</th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                  {requests.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-900/80">
                      <td className="px-4 py-4">{r.id}</td>
                      <td className="px-4 py-4">{r.patientName}</td>
                      <td className="px-4 py-4 text-rose-300 font-semibold">
                        {r.bloodGroup}
                      </td>
                      <td className="px-4 py-4">{r.city}</td>
                      <td className="px-4 py-4">{r.contact}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap justify-center gap-2">
                          <button
                            className="rounded-2xl bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                            onClick={() => handleEdit(r)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-2xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                            onClick={() => deleteRequest(r.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8 rounded-4xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl">
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Available Donors
                </h3>
                <p className="mt-1 text-slate-400">
                  Search by blood group and manage donor data directly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  placeholder="Search Blood Group (A+, O-...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 shadow-inner outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  onClick={handleSearch}
                  className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Search
                </button>
                <button
                  onClick={fetchDonors}
                  className="rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/80">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-4 py-4 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-4 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Blood
                    </th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 py-4 uppercase tracking-wider">City</th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Latitude
                    </th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Longitude
                    </th>
                    <th className="px-4 py-4 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                  {donors.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-900/80">
                      <td className="px-4 py-4">{d.id}</td>
                      <td className="px-4 py-4">{d.name}</td>
                      <td className="px-4 py-4 text-rose-300">
                        {d.bloodGroup}
                      </td>
                      <td className="px-4 py-4">{d.phone}</td>
                      <td className="px-4 py-4">{d.city}</td>
                      <td className="px-4 py-4">{d.latitude}</td>
                      <td className="px-4 py-4">{d.longitude}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap justify-center gap-2">
                          <button
                            onClick={() => openPaymentModal(d)}
                            className="rounded-2xl bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                          >
                            Pay
                          </button>
                          <button
                            className="rounded-2xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                            onClick={() => deleteDonor(d.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8 rounded-4xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Payment History</h3>
                <p className="mt-1 text-slate-400">
                  Record and review all hospital payments made to donors.
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
                {payments.length} payment{payments.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/80">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-4 py-4 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-4 uppercase tracking-wider">Donor</th>
                    <th className="px-4 py-4 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-4 uppercase tracking-wider">Note</th>
                    <th className="px-4 py-4 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-900/80">
                      <td className="px-4 py-4">{payment.id}</td>
                      <td className="px-4 py-4">{payment.donorName}</td>
                      <td className="px-4 py-4 text-emerald-300 font-semibold">
                        ₹{payment.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-slate-300">
                        {payment.note || "—"}
                      </td>
                      <td className="px-4 py-4 text-slate-400">
                        {new Date(payment.paidAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* 💳 PAYMENT MODAL */}
      {paymentModal && activeDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-lg rounded-4xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Pay {activeDonor.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Create a secure donor payment and capture key details.
                </p>
              </div>
              <button
                className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
                onClick={() => setPaymentModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Donor
                </label>
                <input
                  value={activeDonor.name}
                  disabled
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Enter payment amount"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Note
                </label>
                <textarea
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  className="h-28 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Optional message or payment reason"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button
                onClick={payDonor}
                className="rounded-3xl bg-linear-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setPaymentModal(false)}
                className="rounded-3xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✏️ EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-md rounded-4xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Edit Request
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Update the request details then save your changes.
                </p>
              </div>
              <button
                className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
                onClick={() => setEditData(null)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                value={editData.patientName}
                onChange={(e) =>
                  setEditData({ ...editData, patientName: e.target.value })
                }
              />
              <input
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                value={editData.bloodGroup}
                onChange={(e) =>
                  setEditData({ ...editData, bloodGroup: e.target.value })
                }
              />
              <input
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                value={editData.city}
                onChange={(e) =>
                  setEditData({ ...editData, city: e.target.value })
                }
              />
              <input
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                value={editData.contact}
                onChange={(e) =>
                  setEditData({ ...editData, contact: e.target.value })
                }
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button
                onClick={updateRequest}
                className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Save
              </button>
              <button
                onClick={() => setEditData(null)}
                className="rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
