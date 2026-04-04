import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////
  // 🔐 LOGIN
  /////////////////////////////////////////////////////////
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/donor-form");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  /////////////////////////////////////////////////////////
  // 🆕 REGISTER
  /////////////////////////////////////////////////////////
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", {
        username,
        password,
      });

      alert("Registered successfully! Please login.");
      setIsLogin(true);
    } catch (err) {
      alert("Registration failed");
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

      // 👉 trigger login/register
      if (isLogin) {
        handleLogin(e);
      } else {
        handleRegister(e);
      }
    }
  };

  /////////////////////////////////////////////////////////
  // 🎨 UI
  /////////////////////////////////////////////////////////
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700">

      <div className="backdrop-blur-lg bg-white/20 p-12 rounded-3xl shadow-2xl w-[450px] text-center">

        {/* Avatar */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-white flex items-center justify-center text-white text-4xl">
            👤
          </div>
        </div>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mb-8">
          {isLogin ? "User Login" : "User Register"}
        </h2>

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">

          {/* Username */}
          <div className="flex items-center border border-white/40 rounded-xl px-4 py-3 bg-white/10">
            <span className="text-white mr-3 text-lg">👤</span>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none text-white placeholder-white w-full text-lg"
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleUsernameEnter}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-white/40 rounded-xl px-4 py-3 bg-white/10">
            <span className="text-white mr-3 text-lg">🔒</span>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white placeholder-white w-full text-lg"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordEnter}
              required
            />
          </div>

          {/* Button */}
          <button className="w-full py-4 rounded-full bg-purple-700 text-white text-lg font-semibold hover:bg-purple-800 transition duration-300 hover:scale-105">
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-white mt-6 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-white underline mt-1 text-sm hover:text-gray-200"
        >
          {isLogin ? "Register Here" : "Login Here"}
        </button>
      </div>
    </div>
  );
}