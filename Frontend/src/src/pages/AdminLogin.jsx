import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////
  // 🔐 LOGIN
  /////////////////////////////////////////////////////////
  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please enter email & password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("token", "admin-token");
        navigate("/admin-dashboard");
      } else {
        alert("❌ Invalid Credentials");
      }
    } catch (err) {
      alert("⚠️ Server Error");
    }
  };

  /////////////////////////////////////////////////////////
  // ⌨️ ENTER HANDLING
  /////////////////////////////////////////////////////////
  const handleEmailEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus(); // 👉 move to password
    }
  };

  const handlePasswordEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin(); // 👉 login
    }
  };

  /////////////////////////////////////////////////////////
  // 🎨 UI
  /////////////////////////////////////////////////////////
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <p style={styles.smallLabel}>Admin Access</p>
            <h2 style={styles.title}>Admin Login</h2>
          </div>
          <div style={styles.statusPill}>Premium</div>
        </div>

        <p style={styles.subtitle}>
          Secure sign in to manage donor records and dashboard controls.
        </p>

        <div style={styles.inputBox}>
          <span style={styles.icon}>�</span>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailEnter}
          />
        </div>

        <div style={styles.inputBox}>
          <span style={styles.icon}>🔒</span>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordEnter}
          />
        </div>

        <button style={styles.button} onClick={handleLogin}>
          Sign In
        </button>
      </div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }

          button:hover {
            transform: translateY(-1px) scale(1.02);
            box-shadow: 0 18px 40px rgba(248,113,113,0.28);
          }
        `}
      </style>
    </div>
  );
}

/////////////////////////////////////////////////////////
// 🎨 STYLES
/////////////////////////////////////////////////////////

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    background:
      "linear-gradient(135deg, #050816 0%, #111827 35%, #0f172a 100%)",
    overflow: "hidden",
    color: "#f8fafc",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    padding: "44px 40px",
    borderRadius: "30px",
    background: "rgba(15, 23, 42, 0.92)",
    border: "1px solid rgba(148,163,184,0.14)",
    boxShadow: "0 35px 90px rgba(15,23,42,0.35)",
    backdropFilter: "blur(20px)",
    animation: "fadeIn 0.9s ease forwards",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "22px",
  },

  smallLabel: {
    margin: 0,
    fontSize: "0.82rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#38bdf8",
  },

  title: {
    margin: "10px 0 0",
    fontSize: "2.6rem",
    lineHeight: 1.05,
    fontWeight: 800,
    color: "#f8fafc",
  },

  statusPill: {
    padding: "10px 16px",
    borderRadius: "999px",
    background: "rgba(56,189,248,0.16)",
    color: "#38bdf8",
    fontWeight: 700,
    fontSize: "0.85rem",
    alignSelf: "flex-start",
  },

  subtitle: {
    margin: "0 0 28px",
    color: "rgba(226,232,240,0.75)",
    lineHeight: 1.8,
    fontSize: "1rem",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(148,163,184,0.12)",
    marginBottom: "18px",
  },

  icon: {
    fontSize: "1.1rem",
    color: "#38bdf8",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#f8fafc",
    fontSize: "1rem",
    minWidth: "0",
  },

  button: {
    marginTop: "12px",
    width: "100%",
    padding: "16px 18px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    color: "#020617",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};
