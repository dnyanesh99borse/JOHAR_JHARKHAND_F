import { useState, useEffect, useRef } from "react";
import "./TourismPlaces.css";

// ✅ Import your images
import parasnathbg from "./assets/parasnathbg.jpg";
import temple from "./assets/parasnath-temple.jpg";
import trek from "./assets/parasnath-trek.jpg";
import sunset from "./assets/parasnath-sunset.jpg";

export default function ParasnathHills() {
  const [tab, setTab] = useState("about");
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={`ph-section ${inView ? "fade-in" : ""}`}>
      {/* Hero Section */}
      <div className="hero">
        <img src={parasnathbg} alt="Parasnath Hills" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Parasnath Hills</h1>
          <p className="hero-subtitle">
            Sacred peak of Jainism & serene trekking destination in Jharkhand.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={tab === "about" ? "active" : ""}
          onClick={() => setTab("about")}
        >
          About
        </button>
        <button
          className={tab === "map" ? "active" : ""}
          onClick={() => setTab("map")}
        >
          Map
        </button>
        <button
          className={tab === "gallery" ? "active" : ""}
          onClick={() => setTab("gallery")}
        >
          Gallery
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tab === "about" && (
          <p>
            Parasnath Hills, the highest peak of Jharkhand (1,350 m), is revered
            as one of the most important pilgrimage sites for Jains. Known as
            “Sammed Shikharji,” it is believed that 20 out of 24 Jain Tirthankaras
            attained salvation here. The hills also attract trekkers for their
            lush forests, spiritual ambience, and panoramic sunrise views.
          </p>
        )}
        {tab === "map" && (
          <iframe
            title="Parasnath Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.535251627194!2d86.147!3d23.933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4177b22b9e6a9%3A0x5a2b8f03cf58f9d6!2sParasnath%20Hills!5e0!3m2!1sen!2sin!4v1694012312345!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        )}
        {tab === "gallery" && (
          <div className="gallery">
            <img src={temple} alt="Parasnath Temple" />
            <img src={trek} alt="Trekking in Parasnath" />
            <img src={sunset} alt="Sunset view Parasnath" />
          </div>
        )}
      </div>

      {/* Transport Section */}
      <div className="transport">
        <h2>How to Reach</h2>
        <div className="transport-cards">
          <div className="card">
            <h3>🚗 By Road</h3>
            <p>
              Well connected by road from Giridih, Dhanbad, and Ranchi. Local
              taxis and buses are available to Madhuban (base village).
            </p>
          </div>
          <div className="card">
            <h3>🚉 By Train</h3>
            <p>
              Parasnath railway station (15 km from Madhuban) connects major
              cities like Kolkata, Patna, and Delhi.
            </p>
          </div>
          <div className="card">
            <h3>✈️ By Air</h3>
            <p>
              The nearest airports are Ranchi (190 km) and Durgapur (150 km),
              with taxi services to Giridih.
            </p>
          </div>
        </div>
      </div>

      {/* Nearby Attractions */}
      <div className="attractions">
        <h2>Nearby Attractions</h2>
        <ul>
          <li>Shikharji Jain Temples 🛕</li>
          <li>Madhuban Village – Pilgrim base</li>
          <li>Topchanchi Lake 🌊</li>
          <li>Giridih town & Khandoli Park</li>
        </ul>
      </div>
    </div>
  );
}
