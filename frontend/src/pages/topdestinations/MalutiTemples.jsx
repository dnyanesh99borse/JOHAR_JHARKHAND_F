import { useState, useEffect, useRef } from "react";
import "./MalutiTemples.css";

// ✅ Import your images
import malutibg from "./assets/Maluti_Temple.png";
import maluti1 from "./assets/maluti1.webp";
import maluti2 from "./assets/maluti2.jpeg";
import maluti3 from "./assets/maluti3.jpg";

export default function MalutiTemples() {
  const [tab, setTab] = useState("about");
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="mt-section" ref={sectionRef}>
      {/* Hero Section */}
      <div className={`hero ${inView ? "fade-in" : ""}`}>
        <img src={malutibg} alt="Maluti Temples" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Maluti Temples 🛕</h1>
          <p className="hero-subtitle">
            Ancient terracotta temples of faith, art, and heritage in Jharkhand.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => setTab("about")} className={tab === "about" ? "active" : ""}>About</button>
        <button onClick={() => setTab("map")} className={tab === "map" ? "active" : ""}>Map</button>
        <button onClick={() => setTab("gallery")} className={tab === "gallery" ? "active" : ""}>Gallery</button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tab === "about" && (
          <p className="text-lg leading-relaxed text-gray-700">
            Maluti, a heritage village near Shikaripara (Dumka district), is famous for its **108 terracotta temples** built in the 17th century by the Baj Basanta dynasty.  
            These temples, dedicated mostly to Lord Shiva, showcase exquisite terracotta carvings of mythological stories, deities, and folk traditions.  
            Recognized as one of India’s heritage villages, Maluti is a blend of spirituality, art, and history.
          </p>
        )}

        {tab === "map" && (
          <iframe
            title="Maluti Temples Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.248647829533!2d87.413!3d24.354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f17e0b2f7dbeef%3A0x3b67efdbb1c31f7a!2sMaluti%20Temples!5e0!3m2!1sen!2sin!4v1692098543431"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        )}

        {tab === "gallery" && (
          <div className="gallery">
            <img src={maluti1} alt="Maluti Temple 1" />
            <img src={maluti2} alt="Maluti Temple 2" />
            <img src={maluti3} alt="Maluti Temple 3" />
          </div>
        )}
      </div>

      {/* Transport Info */}
      <div className="transport">
        <h2>🚍 How to Reach</h2>
        <div className="transport-cards">
          <div className="card">
            <h3>By Road</h3>
            <p>Connected via Dumka and Rampurhat. Regular buses and taxis available.</p>
          </div>
          <div className="card">
            <h3>By Train</h3>
            <p>Nearest station: Rampurhat (12 km). Dumka is also well connected.</p>
          </div>
          <div className="card">
            <h3>By Air</h3>
            <p>Nearest airport: Kolkata (~220 km). Ranchi (~300 km).</p>
          </div>
        </div>
      </div>

      {/* Nearby Attractions */}
      <div className="attractions">
        <h2>🌿 Nearby Attractions</h2>
        <ul>
          <li>Shiv-Parvati Temple complex</li>
          <li>Heritage Maluti village terracotta art</li>
          <li>Rajmahal Hills & nearby tribal settlements</li>
        </ul>
      </div>
    </div>
  );
}
