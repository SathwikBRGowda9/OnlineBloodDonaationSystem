import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////
  // 🔐 LOGIN
  /////////////////////////////////////////////////////////
  const handleLogin = async () => {
    if (!username || !password) {
      alert("⚠️ Please enter username & password");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
  const handleUsernameEnter = (e) => {
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

        <h2 style={styles.title}>🛡️ Admin Login</h2>

        {/* 👤 Username */}
        <div style={styles.inputBox}>
          <span style={styles.icon}>👤</span>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameEnter}
          />
        </div>

        {/* 🔒 Password */}
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
          Login 🚀
        </button>
      </div>

      {/* 🔥 Animations */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          button:hover {
            transform: scale(1.07);
            box-shadow: 0 0 20px rgba(255,0,0,0.6);
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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(270deg, #ff4d4d, #b71c1c, #7f0000)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 6s ease infinite",
  },

  card: {
    padding: "70px", // 🔥 increased size
    borderRadius: "25px",
    width: "450px",
    textAlign: "center",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
    animation: "fadeIn 1s ease",
  },

  title: {
    marginBottom: "30px",
    fontSize: "30px",
    color: "#fff",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "12px",
    margin: "15px 0",
    padding: "15px",
  },

  icon: {
    marginRight: "10px",
    fontSize: "20px",
    color: "#fff",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "18px",
    color: "#fff",
  },

  button: {
    marginTop: "20px",
    padding: "16px",
    width: "100%",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(45deg, #ff4d4d, #d32f2f)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },
};