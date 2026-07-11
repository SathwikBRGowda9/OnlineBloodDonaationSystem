import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalAuth() {
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [form, setForm] = useState({
    hospitalName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 🔥 refs
  const hospitalRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////
  // LOGIN
  /////////////////////////////////////////////////////////
  const handleLogin = () => {
    fetch("http://localhost:8080/api/hospital/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
    if (!form.hospitalName || !form.email || !form.password) {
      alert("Please complete every field before registering.");
      return;
    }

    fetch("http://localhost:8080/api/hospital/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hospitalName: form.hospitalName,
        email: form.email,
        password: form.password,
      }),
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        setAuthMode("login");
      });
  };

  /////////////////////////////////////////////////////////
  // FORGOT PASSWORD
  /////////////////////////////////////////////////////////
  const handleForgotPassword = () => {
    if (
      !form.hospitalName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill in all fields to reset your password.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    fetch("http://localhost:8080/api/hospital/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hospitalName: form.hospitalName,
        email: form.email,
        newPassword: form.password,
      }),
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        if (msg.includes("success")) {
          setAuthMode("login");
          setForm({ ...form, password: "", confirmPassword: "" });
        }
      });
  };

  /////////////////////////////////////////////////////////
  // ENTER FLOW 🔥
  /////////////////////////////////////////////////////////

  const handleHospitalEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      emailRef.current.focus();
    }
  };

  const handleEmailEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handlePasswordEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (authMode === "login") {
        handleLogin();
      } else if (authMode === "register") {
        handleRegister();
      } else {
        confirmRef.current.focus();
      }
    }
  };

  const handleConfirmEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleForgotPassword();
    }
  };

  const renderHeader = () => {
    if (authMode === "login") return "Doctor Login";
    if (authMode === "register") return "Register Hospital";
    return "Reset Hospital Password";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-slate-950/90" />
      <div className="pointer-events-none absolute -right-40 top-24 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/30 to-sky-500/5 blur-3xl" />
      <div className="pointer-events-none absolute left-24 bottom-16 h-64 w-64 rounded-full bg-linear-to-br from-violet-500/20 to-fuchsia-500/5 blur-3xl" />

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-10 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-800"
      >
        ← Back
      </button>

      <div className="relative mx-auto flex w-full max-w-4xl overflow-hidden rounded-[40px] border border-white/10 bg-slate-900/90 shadow-[0_35px_120px_rgba(15,23,42,0.55)] backdrop-blur-xl">
        <div className="hidden w-1/2 relative overflow-hidden rounded-l-[40px] border-r border-white/10 md:block">
          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80"
            alt="Doctor attending patient"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-full bg-slate-950/60" />
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-10 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Doctor Access
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              Hospital Admin Portal
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300 max-w-xs">
              Secure your medical dashboard and keep donor coordination under
              control.
            </p>
            <div className="mt-8 grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-slate-800/80 p-5 shadow-inner">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Trusted
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Verified hospital access
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-slate-800/80 p-5 shadow-inner">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Premium
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Secure request management
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-900 px-8 py-10 sm:px-14 sm:py-12 md:w-1/2">
          <div className="mx-auto max-w-md text-white">
            <div className="mb-8 space-y-4 text-center">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                Hospital Verified
              </p>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {renderHeader()}
              </h2>
              <p className="mx-auto max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                {authMode === "forgot"
                  ? "Reset your hospital password using your registered details."
                  : "Manage hospital requests safely and keep your care team connected to donors."}
              </p>
            </div>

            {authMode !== "login" && (
              <input
                ref={hospitalRef}
                onKeyDown={handleHospitalEnter}
                placeholder="Hospital Name"
                value={form.hospitalName}
                onChange={(e) =>
                  setForm({ ...form, hospitalName: e.target.value })
                }
                className="w-full mb-4 px-5 py-4 rounded-3xl border border-white/10 bg-white/10 text-slate-100 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
            )}

            <input
              ref={emailRef}
              onKeyDown={handleEmailEnter}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mb-4 px-5 py-4 rounded-3xl border border-white/10 bg-white/10 text-slate-100 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                onKeyDown={handlePasswordEnter}
                type={
                  authMode === "forgot" && !showNewPassword
                    ? "password"
                    : showPassword
                      ? "text"
                      : "password"
                }
                placeholder={
                  authMode === "forgot" ? "New Password" : "Password"
                }
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full mb-4 px-5 py-4 rounded-3xl border border-white/10 bg-white/10 text-slate-100 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-3 cursor-pointer text-slate-300 transition hover:text-slate-100"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {authMode === "forgot" && (
              <div className="relative">
                <input
                  ref={confirmRef}
                  onKeyDown={handleConfirmEnter}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="w-full mb-4 px-5 py-4 rounded-3xl border border-white/10 bg-white/10 text-slate-100 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-5 top-3 cursor-pointer text-slate-300 transition hover:text-slate-100"
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </span>
              </div>
            )}

            <button
              onClick={
                authMode === "login"
                  ? handleLogin
                  : authMode === "register"
                    ? handleRegister
                    : handleForgotPassword
              }
              className="mb-5 w-full rounded-3xl bg-linear-to-r from-cyan-400 to-sky-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(56,189,248,0.25)]"
            >
              {authMode === "login" && "Login"}
              {authMode === "register" && "Register"}
              {authMode === "forgot" && "Reset Password"}
            </button>

            <div className="space-y-3 text-center text-sm text-slate-400">
              {authMode === "login" && (
                <>
                  <p>
                    New hospital?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("register")}
                      className="font-semibold text-cyan-300 transition hover:text-cyan-100"
                    >
                      Register
                    </button>
                  </p>
                  <p>
                    Forgot password?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("forgot")}
                      className="font-semibold text-cyan-300 transition hover:text-cyan-100"
                    >
                      Reset now
                    </button>
                  </p>
                </>
              )}

              {authMode === "register" && (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="font-semibold text-cyan-300 transition hover:text-cyan-100"
                  >
                    Login
                  </button>
                </p>
              )}

              {authMode === "forgot" && (
                <p>
                  Remembered your password?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="font-semibold text-cyan-300 transition hover:text-cyan-100"
                  >
                    Back to login
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
