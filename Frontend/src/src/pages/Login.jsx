import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaArrowLeft, FaKey } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const resetFeedback = () => {
    setFeedback("");
    setError("");
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    resetFeedback();
    setLoading(true);

    try {
      // Decode the JWT token from Google
      const base64Url = credentialResponse.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );

      const googleData = JSON.parse(jsonPayload);

      const res = await axios.post("http://localhost:8080/auth/google-login", {
        googleId: googleData.sub,
        email: googleData.email,
        name: googleData.name,
        profilePicture: googleData.picture,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/donor-form");
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/donor-form");
    } catch (err) {
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
      });

      setFeedback("Registered successfully! You can now sign in.");
      setMode("login");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Registration failed. The email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please type the same password twice.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/forgot-password", {
        email,
        password,
      });

      setFeedback(
        "Password reset successfully. Please sign in with your new password.",
      );
      setMode("login");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Unable to reset password. Please verify your email.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (mode === "login") return handleLogin(e);
    if (mode === "register") return handleRegister(e);
    if (mode === "forgot") return handleForgotPassword(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-3 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <FaArrowLeft />
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-2xl mb-4">
            <FaKey className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            BloodLink Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {mode === "login"
              ? "Secure donor access"
              : mode === "register"
                ? "Create your donor account"
                : "Reset your password safely"}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {mode === "login"
                ? "Welcome Back"
                : mode === "register"
                  ? "Create Account"
                  : "Forgot Password"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {mode === "login"
                ? "Sign in to access donor services"
                : mode === "register"
                  ? "Join the BloodLink community"
                  : "Reset your password with your email"}
            </p>
          </div>

          {feedback && (
            <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {feedback}
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 text-lg" />
              </div>
              <input
                ref={emailRef}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            {(mode === "login" || mode === "register" || mode === "forgot") && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 text-lg" />
                </div>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder={mode === "forgot" ? "New Password" : "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
            )}

            {(mode === "register" || mode === "forgot") && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 text-lg" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-semibold shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : mode === "login"
                  ? "Sign In"
                  : mode === "register"
                    ? "Create Account"
                    : "Reset Password"}
            </button>

            {mode === "login" && (
              <div className="w-full">
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  width="100%"
                />
              </div>
            )}
          </form>

          <div className="flex flex-col gap-3 mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {mode === "login" && (
              <>
                <button
                  onClick={() => {
                    resetFeedback();
                    setMode("forgot");
                  }}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  Forgot Password?
                </button>
                <div>
                  New to BloodLink?{" "}
                  <button
                    onClick={() => {
                      resetFeedback();
                      setMode("register");
                    }}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    Register now
                  </button>
                </div>
              </>
            )}

            {mode === "register" && (
              <div>
                Already registered?{" "}
                <button
                  onClick={() => {
                    resetFeedback();
                    setMode("login");
                  }}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  Sign in
                </button>
              </div>
            )}

            {mode === "forgot" && (
              <div>
                Remembered your password?{" "}
                <button
                  onClick={() => {
                    resetFeedback();
                    setMode("login");
                  }}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  Back to login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
