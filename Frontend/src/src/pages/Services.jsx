import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/requests")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error(err));
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
      <h2 style={styles.heading}>🏥 Hospitals Need Blood</h2>

      <div style={styles.grid}>
        {requests.map((r, index) => (
          <div
            key={r.id}
            style={{
              ...styles.card,
              animation: `fadeIn 0.6s ease forwards`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div style={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
                alt="hospital"
                style={styles.image}
              />
            </div>

            <h3 style={styles.name}>{r.hospitalName}</h3>

            <p><b>Patient:</b> {r.patientName}</p>
            <p>
              <b>Blood:</b>{" "}
              <span style={styles.blood}>{r.bloodGroup}</span>
            </p>
            <p><b>City:</b> {r.city}</p>

            <button
              style={styles.button}
              onClick={() => handleDonate(r)}
            >
              Donate ❤️
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 GLOBAL ANIMATIONS */}
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
            transform: translateY(-10px) scale(1.02);
          }

          img:hover {
            transform: scale(1.1);
          }

          button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(255,0,0,0.6);
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

    // 🔥 Animated Gradient Background
    background: "linear-gradient(270deg, #f8f9fa, #e3f2fd, #fce4ec)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 10s ease infinite"
  },

  heading: {
    textAlign: "center",
    color: "#d32f2f",
    marginBottom: "30px",
    fontSize: "30px",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "rgba(255,255,255,0.2)", // 🔥 glass effect
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "0.4s",
    cursor: "pointer"
  },

  imageWrapper: {
    overflow: "hidden",
    borderRadius: "12px"
  },

  image: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
    transition: "0.4s"
  },

  name: {
    margin: "10px 0",
    color: "#222",
    fontSize: "19px",
    fontWeight: "bold"
  },

  blood: {
    color: "#e53935",
    fontWeight: "bold",
    fontSize: "17px"
  },

  button: {
    marginTop: "12px",
    padding: "12px",
    width: "100%",
    background: "linear-gradient(45deg, #ff4d4d, #d32f2f)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s"
  }
};