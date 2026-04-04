import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  // 🌙 DARK MODE (NO TAILWIND CONFIG)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className="font-sans transition duration-500"
      style={{
        backgroundColor: darkMode ? "#111" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >

      {/* 🔴 NAVBAR */}
      <nav
        className="flex justify-between items-center px-10 py-4 text-white sticky top-0 z-50 shadow-lg"
        style={{ background: darkMode ? "#000" : "#d32f2f" }}
      >
        <h2 className="text-2xl font-bold hover:scale-105 transition">
          🩸 Donate Your Blood
        </h2>

        <div className="flex items-center gap-4">
          <a href="#home" className="hover:text-yellow-300">Home</a>
          <a href="#about" className="hover:text-yellow-300">About</a>
          <a href="#contact" className="hover:text-yellow-300">Contact</a>

          <button onClick={() => navigate("/services")}>Services</button>

          <button
            onClick={() => navigate("/login")}
            className="bg-white text-red-600 px-3 py-1 rounded hover:scale-110 transition"
          >
            User Login
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="bg-black px-3 py-1 rounded hover:bg-gray-800 transition"
          >
            Admin
          </button>

          <button
            onClick={() => navigate("/hospital-auth")}
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Hospital
          </button>

          {/* 🌙 TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-gray-300 text-black hover:scale-110 transition"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      {/* 🏠 HERO */}
      <section
        id="home"
        className="h-[90vh] flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4 typing">
            Donate Blood ❤️ Save Lives
          </h1>

          <p className="mb-6 text-lg">
            One donation can save up to 3 lives. Be a hero today.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:scale-110 transition"
          >
            Donate Now 🚀
          </button>
        </div>
      </section>

      {/* ℹ️ ABOUT */}
      <section
        id="about"
        className="py-16 px-6 text-center"
        style={{ background: darkMode ? "#222" : "#f5f5f5" }}
      >
        <h2 className="text-3xl font-bold text-red-600 mb-10">
          About Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80"
              alt="save life"
              className="w-[300px] h-[300px] object-cover rounded-full border-4 border-red-500 shadow-xl hover:scale-105 transition"
            />
          </div>

          {/* TEXT */}
          <div className="space-y-4 text-left">
            <p className="text-lg">
              Our platform connects blood donors with hospitals instantly,
              ensuring that no life is lost due to shortage.
            </p>

            <p>
              ❤️ <b>Mission:</b> Save lives <br />
              🏥 <b>Vision:</b> No blood shortage
            </p>

            <p>
              Join our mission and become a real-life hero by donating blood.
            </p>

            <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 hover:scale-105 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ❤️ FEATURES */}
      <section className="py-14 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-8">
          Why Choose Us?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {["Save Lives ❤️", "Help Hospitals 🏥", "Global Impact 🌍"].map(
            (item, i) => (
              <div
                key={i}
                style={{ background: darkMode ? "#333" : "#eee" }}
                className="p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition w-60"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>

      {/* 📞 CONTACT */}
      <section
        id="contact"
        className="py-16 text-center"
        style={{ background: darkMode ? "#222" : "#f5f5f5" }}
      >
        <h2 className="text-3xl font-bold text-red-600 mb-6">
          Contact Us
        </h2>

        <div className="max-w-md mx-auto space-y-4">
          <input placeholder="Your Name" className="w-full p-3 rounded border" />
          <input placeholder="Your Email" className="w-full p-3 rounded border" />
          <textarea placeholder="Message" className="w-full p-3 h-28 rounded border"></textarea>

          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 hover:scale-105 transition">
            Send Message
          </button>
        </div>
      </section>

      {/* 🔻 FOOTER WITH SOCIAL */}
      <footer
        style={{ background: darkMode ? "#000" : "#222" }}
        className="text-white py-10 px-6"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">

          <div>
            <h3 className="text-xl font-bold mb-3">🩸 Donate Blood</h3>
            <p>Saving lives every day ❤️</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
            <p className="hover:text-red-400 cursor-pointer">Home</p>
            <p className="hover:text-red-400 cursor-pointer">About</p>
            <p className="hover:text-red-400 cursor-pointer">Contact</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-5 text-2xl">
              <a href="https://facebook.com" target="_blank">👍</a>
              <a href="https://instagram.com" target="_blank">📸</a>
              <a href="https://twitter.com" target="_blank">🐦</a>
              <a href="https://linkedin.com" target="_blank">💼</a>
              <a href="https://youtube.com" target="_blank">▶️</a>
            </div>
          </div>

        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          © 2026 Donate Blood ❤️ | All Rights Reserved
        </p>
      </footer>
    </div>
  );
}