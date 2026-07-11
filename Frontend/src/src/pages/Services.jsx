import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDonate = (r) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠ Please login first");
      navigate("/login");
      return;
    }

    localStorage.setItem("selectedBlood", r.bloodGroup);
    localStorage.setItem("selectedCity", r.city);

    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.introBanner}>
        <div>
          <p style={styles.pretitle}>Hospital Support</p>
          <h2 style={styles.heading}>Hospitals Need Blood</h2>
          <p style={styles.ingress}>
            Discover urgent blood requests from nearby hospitals and help save
            lives today.
          </p>
        </div>
        <div style={styles.statsChip}>
          <span style={styles.statsLabel}>Active Requests</span>
          <strong style={styles.statsValue}>{requests.length}</strong>
        </div>
      </div>

      <div style={styles.grid}>
        {requests.map((r, index) => (
          <div
            key={r.id}
            style={{
              ...styles.card,
              animation: `fadeIn 0.6s ease forwards`,
              animationDelay: `${index * 0.08}s`,
            }}
          >
            <div style={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80"
                alt="hospital"
                style={styles.image}
              />
            </div>

            <h3 style={styles.name}>{r.hospitalName}</h3>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Patient</span>
              <span style={styles.detailValue}>{r.patientName}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Blood Type</span>
              <span style={styles.blood}>{r.bloodGroup}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>City</span>
              <span style={styles.detailValue}>{r.city}</span>
            </div>

            <button style={styles.button} onClick={() => handleDonate(r)}>
              Donate ❤️
            </button>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .card-hover:hover {
            transform: translateY(-8px) scale(1.01);
          }

          .image-hover:hover {
            transform: scale(1.05);
          }

          .button-hover:hover {
            transform: translateY(-1px);
            box-shadow: 0 18px 40px rgba(220, 38, 38, 0.24);
          }
        `}
      </style>
    </div>
  );
}

/////////////////////////////////////////////////////////
// 🎨 PREMIUM STYLES
/////////////////////////////////////////////////////////

const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
    color: "#e2e8f0",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  introBanner: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "30px",
    borderRadius: "28px",
    background: "rgba(15, 23, 42, 0.86)",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    boxShadow: "0 40px 80px rgba(15,23,42,0.35)",
    marginBottom: "32px",
  },

  pretitle: {
    margin: 0,
    color: "#38bdf8",
    fontSize: "0.85rem",
    letterSpacing: "0.24em",
    textTransform: "uppercase",
  },

  heading: {
    margin: "10px 0 0",
    fontSize: "2.8rem",
    lineHeight: 1.05,
    fontWeight: 800,
    color: "#f8fafc",
  },

  ingress: {
    margin: "16px 0 0",
    maxWidth: "620px",
    color: "rgba(226, 232, 240, 0.72)",
    fontSize: "1rem",
    lineHeight: 1.8,
  },

  statsChip: {
    minWidth: "180px",
    padding: "20px 24px",
    borderRadius: "22px",
    border: "1px solid rgba(56,189,248,0.18)",
    background: "rgba(14, 165, 233, 0.12)",
    textAlign: "center",
    boxShadow: "inset 0 0 0 1px rgba(56,189,248,0.08)",
  },

  statsLabel: {
    display: "block",
    color: "rgba(226,232,240,0.8)",
    fontSize: "0.85rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },

  statsValue: {
    display: "block",
    marginTop: "12px",
    fontSize: "2.6rem",
    fontWeight: 800,
    color: "#fff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "rgba(15, 23, 42, 0.92)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  imageWrapper: {
    overflow: "hidden",
    borderRadius: "20px",
    marginBottom: "20px",
    border: "1px solid rgba(148, 163, 184, 0.12)",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    transition: "transform 0.4s ease",
    display: "block",
  },

  name: {
    margin: "0 0 12px",
    fontSize: "1.35rem",
    color: "#f8fafc",
    fontWeight: 700,
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
    color: "rgba(226,232,240,0.86)",
    fontSize: "0.96rem",
  },

  detailLabel: {
    color: "rgba(148,163,184,0.95)",
    fontWeight: 600,
  },

  detailValue: {
    color: "#ffffff",
    fontWeight: 700,
  },

  blood: {
    color: "#f97316",
    fontWeight: 700,
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    color: "#020617",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};
