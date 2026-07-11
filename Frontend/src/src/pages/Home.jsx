import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaMoon,
  FaSun,
  FaHeartbeat,
  FaHospital,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`font-sans transition-all duration-500 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Premium Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 shadow-lg backdrop-blur-md ${darkMode ? "bg-gray-900/90 border-b border-gray-700" : "bg-white/90 border-b border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaHeartbeat className="text-red-500 text-2xl" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                BloodLink
              </h2>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
              <button
                onClick={() => navigate("/services")}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 font-medium"
              >
                Services
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Donate Blood
              </button>

              <button
                onClick={() => navigate("/admin-login")}
                className="bg-gray-800 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-700 transform hover:scale-105 transition-all duration-200"
              >
                Admin
              </button>

              <button
                onClick={() => navigate("/hospital-auth")}
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
              >
                Hospital
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/70 to-pink-900/80"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent leading-tight">
              Donate Blood,
              <br />
              Save Lives
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Every drop counts. Join our community of heroes and make a
              difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/25"
              >
                Start Donating 🚀
              </button>
              <button
                onClick={() => navigate("/services")}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <FaHeartbeat className="text-white text-2xl" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-1000">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <FaHospital className="text-white text-2xl" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              About BloodLink
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connecting donors with hospitals to ensure no life is lost due to
              blood shortage
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl transform rotate-3 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80"
                alt="Blood donation"
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-500 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To create a seamless connection between blood donors and
                  healthcare facilities, ensuring timely access to life-saving
                  blood transfusions.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-500 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A world where blood shortage is eliminated through community
                  participation and efficient resource management.
                </p>
              </div>

              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Why Choose BloodLink?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience the difference with our premium blood donation platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
            >
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHeartbeat className="text-red-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-500">
                  Save Lives
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every donation can save up to 3 lives. Your contribution makes
                  a real difference.
                </p>
              </div>
            </div>

            <div
              className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
            >
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHospital className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-500">
                  Hospital Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Direct connection with hospitals ensures your donation reaches
                  those in need instantly.
                </p>
              </div>
            </div>

            <div
              className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
            >
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaGlobe className="text-green-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-500">
                  Global Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join a worldwide community of donors creating positive change
                  across the globe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Have questions? We're here to help you make a difference.
            </p>
          </div>

          <div
            className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-xl ${darkMode ? "bg-gray-700" : "bg-white"}`}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${darkMode ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${darkMode ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows="5"
                className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${darkMode ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-900"}`}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900 border-t border-gray-700" : "bg-gray-800 text-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaHeartbeat className="text-red-500 text-2xl" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  BloodLink
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Saving lives through efficient blood donation management.
              </p>
              <p className="text-sm text-gray-500">
                © 2026 BloodLink. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#home"
                    className="hover:text-red-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-red-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-red-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Services
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Donor Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/admin-login")}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Admin Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/hospital-auth")}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Hospital Login
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-xl"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="text-gray-400 hover:text-pink-400 transition-colors text-xl"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-300 transition-colors text-xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-500 transition-colors text-xl"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  className="text-gray-400 hover:text-red-500 transition-colors text-xl"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
