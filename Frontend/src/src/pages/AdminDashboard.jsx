import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [allDonors, setAllDonors] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    } else {
      fetchDonors();
    }
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/donors");
      const data = await res.json();
      setDonors(data);
      setAllDonors(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 SEARCH
  const handleSearch = () => {
    if (!search.trim()) {
      setDonors(allDonors);
      return;
    }

    const filtered = allDonors.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
        d.city.toLowerCase().includes(search.toLowerCase())
    );

    setDonors(filtered);
  };

  const deleteDonor = async (id) => {
    await fetch(`http://localhost:8080/api/donors/${id}`, {
      method: "DELETE",
    });
    fetchDonors();
  };

  return (
    <div style={styles.container}>
      
      {/* 🔴 SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "10px" }}>🛡️ Admin</h2>
        <p style={{ marginBottom: "5px" }}>Dashboard</p>
        <p>Donors List</p>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin-login");
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <h2>Admin Dashboard</h2>

        {/* 🔥 TOTAL DONORS */}
        <div style={styles.card}>
          <h3>Total Donors</h3>
          <h1>{donors.length}</h1>
        </div>

        {/* 🔍 SEARCH */}
        <div style={styles.searchBox}>
          <input
            placeholder="Search by name / blood / city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
          <button style={styles.resetBtn} onClick={() => setDonors(allDonors)}>
            Reset
          </button>
        </div>

        {/* 📋 TABLE */}
        <div style={styles.tableBox}>
          <h3>Donors List</h3>

          <table style={styles.table}>
            <thead>
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
              {donors.length > 0 ? (
                donors.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.bloodGroup}</td>
                    <td>{d.phone}</td>
                    <td>{d.city}</td>
                    <td>{d.latitude}</td>
                    <td>{d.longitude}</td>
                    <td>
                      <button
                        style={styles.delete}
                        onClick={() => deleteDonor(d.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No donors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📍 MAP */}
        <div style={styles.mapBox}>
          <h3>Donor Locations</h3>

          <iframe
            width="100%"
            height="300"
            style={{ borderRadius: "10px", border: "none" }}
            src="https://maps.google.com/maps?q=13.42,75.25&z=10&output=embed"
          ></iframe>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    background: "#f4f6f9",
  },

  sidebar: {
    width: "220px",
    background: "#b71c1c",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },

  logout: {
    marginTop: "auto",
    padding: "10px",
    background: "black",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  card: {
    background: "#d32f2f",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "center",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "250px",
  },

  searchBtn: {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "10px",
  },

  resetBtn: {
    background: "gray",
    color: "#fff",
    border: "none",
    padding: "10px",
  },

  tableBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse",
  },

  delete: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },

  mapBox: {
    marginTop: "20px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
};