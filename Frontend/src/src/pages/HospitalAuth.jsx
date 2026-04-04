import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    hospitalName: "",
    username: "",
    password: ""
  });

  // 🔥 refs
  const hospitalRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////
  // LOGIN
  /////////////////////////////////////////////////////////
  const handleLogin = () => {
    fetch("http://localhost:8080/api/hospital/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        password: form.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message.includes("Success")) {
          localStorage.setItem("hospitalName", data.hospitalName);
          navigate("/hospital-form");
        } else {
          alert(data.message);
        }
      });
  };

  /////////////////////////////////////////////////////////
  // REGISTER
  /////////////////////////////////////////////////////////
  const handleRegister = () => {
    fetch("http://localhost:8080/api/hospital/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        setIsLogin(true);
      });
  };

  /////////////////////////////////////////////////////////
  // ENTER FLOW 🔥
  /////////////////////////////////////////////////////////

  // Hospital Name → Username
  const handleHospitalEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      usernameRef.current.focus();
    }
  };

  // Username → Password
  const handleUsernameEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  // Password → Submit
  const handlePasswordEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (isLogin) {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  };

  /////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500">

      {/* BACK */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 bg-black/70 text-white px-5 py-2 rounded-xl"
      >
        ← Back
      </button>

      <div className="flex w-[1000px] h-[550px] rounded-3xl overflow-hidden shadow-2xl">

        {/* IMAGE */}
        <div className="w-1/2 bg-white">
          <img
            src="https://img.freepik.com/free-photo/young-doctor-posing-with-stethoscope_23-2148827776.jpg"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">

          <div className="w-[80%] text-center text-white">

            <h2 className="text-3xl mb-8 font-semibold">
              {isLogin ? "Welcome Back !" : "Create Account"}
            </h2>

            {/* 🏥 HOSPITAL NAME (REGISTER ONLY) */}
            {!isLogin && (
              <input
                ref={hospitalRef}
                onKeyDown={handleHospitalEnter}
                placeholder="Hospital Name"
                value={form.hospitalName}
                onChange={(e) =>
                  setForm({ ...form, hospitalName: e.target.value })
                }
                className="w-full mb-4 px-5 py-3 rounded-full bg-white/90 text-black"
              />
            )}

            {/* 👤 USERNAME */}
            <input
              ref={usernameRef}
              onKeyDown={handleUsernameEnter}
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              className="w-full mb-4 px-5 py-3 rounded-full bg-white/90 text-black"
            />

            {/* 🔒 PASSWORD */}
            <div className="relative">
              <input
                ref={passwordRef}
                onKeyDown={handlePasswordEnter}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full mb-4 px-5 py-3 rounded-full bg-white/90 text-black"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-3 cursor-pointer text-black"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* BUTTON */}
            <button
              onClick={isLogin ? handleLogin : handleRegister}
              className="w-full py-3 rounded-full bg-white text-purple-700 font-bold text-lg"
            >
              {isLogin ? "Login" : "Register"}
            </button>

            {/* SWITCH */}
            <p className="mt-6">
              {isLogin ? "New hospital?" : "Already have account?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-300 cursor-pointer"
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}