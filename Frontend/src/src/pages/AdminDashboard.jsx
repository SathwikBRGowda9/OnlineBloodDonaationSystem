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
        d.city.toLowerCase().includes(search.toLowerCase()),
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
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.sidebarBadge}>A</div>
          <div>
            <h2 style={styles.sidebarTitle}>Admin Portal</h2>
            <p style={styles.sidebarSubtitle}>Premium access</p>
          </div>
        </div>

        <nav style={styles.sidebarNav}>
          <button style={styles.navButton}>Overview</button>
          <button style={styles.navButton}>Donors</button>
          <button style={styles.navButton}>Reports</button>
        </nav>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin-login");
          }}
        >
          Logout
        </button>
      </aside>

      <main style={styles.main}>
        <header style={styles.hero}>
          <div>
            <p style={styles.heroLabel}>Executive Insights</p>
            <h1 style={styles.heroTitle}>Donor Management</h1>
            <p style={styles.heroText}>
              A premium dashboard for managing donor records, search, and
              location data with clarity.
            </p>
          </div>
          <div style={styles.heroMetric}>
            <span style={styles.metricLabel}>Active Donors</span>
            <strong style={styles.metricValue}>{donors.length}</strong>
          </div>
        </header>

        <section style={styles.cardsRow}>
          <div style={styles.cardAlt}>
            <p style={styles.cardLabel}>Donor Inventory</p>
            <h2 style={styles.cardValue}>{donors.length}</h2>
            <p style={styles.cardNote}>
              Total donors available in the system right now.
            </p>
          </div>
          <div style={styles.cardAltSecondary}>
            <p style={styles.cardLabel}>Search Ready</p>
            <h2 style={styles.cardValue}>
              {search ? "Filtered" : "All records"}
            </h2>
            <p style={styles.cardNote}>
              Search by name, blood group, or city anytime.
            </p>
          </div>
        </section>

        <section style={styles.searchSection}>
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
        </section>

        <section style={styles.tableSection}>
          <div style={styles.tableHeaderRow}>
            <div>
              <h3 style={styles.sectionTitle}>Donors List</h3>
              <p style={styles.sectionSubtitle}>
                Manage records with a premium, high-contrast layout.
              </p>
            </div>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Blood</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>City</th>
                  <th style={styles.th}>Latitude</th>
                  <th style={styles.th}>Longitude</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {donors.length > 0 ? (
                  donors.map((d) => (
                    <tr key={d.id} style={styles.row}>
                      <td style={styles.td}>{d.id}</td>
                      <td style={styles.td}>{d.name}</td>
                      <td style={styles.td}>{d.bloodGroup}</td>
                      <td style={styles.td}>{d.phone}</td>
                      <td style={styles.td}>{d.city}</td>
                      <td style={styles.td}>{d.latitude}</td>
                      <td style={styles.td}>{d.longitude}</td>
                      <td style={styles.td}>
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
                    <td colSpan="8" style={styles.noData}>
                      No donors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section style={styles.mapPanel}>
          <div style={styles.mapHeader}>
            <h3 style={styles.sectionTitle}>Donor Locations</h3>
          </div>
          <iframe
            width="100%"
            height="320"
            style={styles.mapFrame}
            src="https://maps.google.com/maps?q=13.42,75.25&z=10&output=embed"
            title="Donor location map"
          ></iframe>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
    background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
    color: "#e2e8f0",
  },

  sidebar: {
    width: "260px",
    background: "rgba(15, 23, 42, 0.96)",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    borderRight: "1px solid rgba(148,163,184,0.14)",
    boxShadow: "10px 0 60px rgba(15,23,42,0.25)",
  },

  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  sidebarBadge: {
    width: "52px",
    height: "52px",
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    fontSize: "1.2rem",
    fontWeight: 800,
    color: "#020617",
    background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  },

  sidebarTitle: {
    margin: 0,
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#f8fafc",
  },

  sidebarSubtitle: {
    margin: 0,
    fontSize: "0.95rem",
    color: "rgba(226,232,240,0.75)",
  },

  sidebarNav: {
    display: "grid",
    gap: "12px",
  },

  navButton: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.1)",
    color: "#e2e8f0",
    background: "rgba(148,163,184,0.06)",
    cursor: "pointer",
    fontWeight: 600,
    textAlign: "left",
  },

  logout: {
    marginTop: "auto",
    padding: "14px 18px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(135deg, #f97316, #ef4444)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "36px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "32px",
    borderRadius: "28px",
    background: "rgba(15, 23, 42, 0.92)",
    border: "1px solid rgba(148,163,184,0.12)",
    boxShadow: "0 30px 60px rgba(15,23,42,0.24)",
  },

  heroLabel: {
    margin: 0,
    color: "#38bdf8",
    fontSize: "0.85rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },

  heroTitle: {
    margin: "16px 0 0",
    fontSize: "2.8rem",
    fontWeight: 800,
    lineHeight: 1.05,
    color: "#f8fafc",
  },

  heroText: {
    margin: "16px 0 0",
    maxWidth: "640px",
    color: "rgba(226,232,240,0.7)",
    fontSize: "1rem",
    lineHeight: 1.75,
  },

  heroMetric: {
    minWidth: "220px",
    padding: "22px",
    borderRadius: "26px",
    background:
      "linear-gradient(180deg, rgba(56,189,248,0.18), rgba(6,182,212,0.08))",
    border: "1px solid rgba(56,189,248,0.16)",
    textAlign: "center",
  },

  metricLabel: {
    display: "block",
    color: "rgba(226,232,240,0.75)",
    fontSize: "0.85rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },

  metricValue: {
    marginTop: "16px",
    fontSize: "3rem",
    fontWeight: 800,
    color: "#f8fafc",
  },

  cardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  cardAlt: {
    padding: "28px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(148,163,184,0.1)",
    boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
  },

  cardAltSecondary: {
    padding: "28px",
    borderRadius: "28px",
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(56,189,248,0.12)",
    boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
  },

  cardLabel: {
    margin: 0,
    color: "rgba(226,232,240,0.75)",
    fontSize: "0.9rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  cardValue: {
    margin: "18px 0 0",
    color: "#fff",
    fontSize: "2.8rem",
    fontWeight: 800,
  },

  cardNote: {
    margin: "16px 0 0",
    color: "rgba(226,232,240,0.7)",
    lineHeight: 1.75,
  },

  searchSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    alignItems: "center",
    padding: "22px",
    borderRadius: "24px",
    background: "rgba(15,23,42,0.92)",
    border: "1px solid rgba(148,163,184,0.1)",
  },

  input: {
    flex: 1,
    minWidth: "240px",
    padding: "16px 18px",
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.14)",
    background: "rgba(15,23,42,0.95)",
    color: "#e2e8f0",
    outline: "none",
    fontSize: "0.98rem",
  },

  searchBtn: {
    padding: "16px 26px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    color: "#020617",
    cursor: "pointer",
    fontWeight: 700,
  },

  resetBtn: {
    padding: "16px 26px",
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.2)",
    background: "rgba(148,163,184,0.08)",
    color: "#e2e8f0",
    cursor: "pointer",
    fontWeight: 600,
  },

  tableSection: {
    padding: "24px",
    borderRadius: "28px",
    background: "rgba(15,23,42,0.92)",
    border: "1px solid rgba(148,163,184,0.12)",
    boxShadow: "0 30px 60px rgba(15,23,42,0.24)",
  },

  tableHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "#f8fafc",
  },

  sectionSubtitle: {
    margin: "8px 0 0",
    color: "rgba(226,232,240,0.72)",
    fontSize: "0.95rem",
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "22px",
    background: "rgba(15,23,42,0.95)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "920px",
  },

  thead: {
    background: "rgba(15,23,42,0.95)",
  },

  th: {
    padding: "18px 20px",
    textAlign: "left",
    color: "rgba(226,232,240,0.75)",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderBottom: "1px solid rgba(148,163,184,0.12)",
  },

  row: {
    transition: "background 0.2s ease",
  },

  td: {
    padding: "18px 20px",
    color: "#e2e8f0",
    borderBottom: "1px solid rgba(148,163,184,0.08)",
  },

  noData: {
    padding: "28px 20px",
    textAlign: "center",
    color: "rgba(226,232,240,0.65)",
  },

  delete: {
    padding: "10px 16px",
    borderRadius: "14px",
    background: "#ef4444",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: 700,
  },

  mapPanel: {
    borderRadius: "28px",
    overflow: "hidden",
    background: "rgba(15,23,42,0.92)",
    border: "1px solid rgba(148,163,184,0.12)",
    boxShadow: "0 30px 60px rgba(15,23,42,0.24)",
  },

  mapHeader: {
    padding: "24px",
  },

  mapFrame: {
    width: "100%",
    border: "none",
    minHeight: "320px",
    display: "block",
  },
};
