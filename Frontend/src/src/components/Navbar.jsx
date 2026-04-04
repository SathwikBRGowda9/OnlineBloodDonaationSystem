import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🩸 Blood Donation</h2>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/terms" style={styles.link}>Terms</Link>
        <Link to="/login" style={styles.button}>Login</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "linear-gradient(90deg, #d32f2f, #ff5252)",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },
  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold"
  },
  link: {
    margin: "0 12px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px"
  },
  button: {
    marginLeft: "15px",
    padding: "8px 15px",
    background: "#fff",
    color: "#d32f2f",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold"
  }
};