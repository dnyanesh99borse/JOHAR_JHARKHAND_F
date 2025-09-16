import React, { useState, useEffect, useRef } from "react";

// Import assets (replace with your actual images)
import netarhatbg from "./assets/netarhat.png";
import lodhfall from "./assets/lodhfalls.jpg";
import sunrise from "./assets/sunset.jpg";
import pineforest from "./assets/pineforest.jpg";
import koelsunset from "./assets/koelsunset.webp";

import { FaBusAlt, FaTrain, FaPlaneDeparture } from "react-icons/fa";

import "./TourismPlaces.css"; // optional if you want custom animations

export default function Netarhat() {
  const [tab, setTab] = useState("about");
  const observedRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          } else {
            entry.target.classList.remove("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.2 }
    );

    observedRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observedRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="netarhat-container font-inter">
      {/* Hero Section */}
      <div
        ref={(el) => (observedRefs.current[0] = el)}
        className="hero-section opacity-0 transition-all duration-1000"
      >
        <img src={netarhatbg} alt="Netarhat" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Netarhat</h1>
          <p className="hero-subtitle">Queen of Chotanagpur Plateau</p>
        </div>
      </div>

      {/* Tabs */}
      <div
        ref={(el) => (observedRefs.current[1] = el)}
        className="tabs-container opacity-0 transition-all duration-1000"
      >
        <div className="tabs">
          {["about", "map", "gallery"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`tab-button ${tab === item ? "active" : ""}`}
            >
              {item === "about"
                ? "About Place"
                : item === "map"
                ? "Map"
                : "Gallery"}
            </button>
          ))}
        </div>

        {tab === "about" && (
          <div className="tab-content">
            <h3 className="tab-title">Discover Netarhat</h3>
            <p className="tab-text">
              Known as the <span className="highlight">“Queen of Chotanagpur”</span>, Netarhat is a serene hill station nestled in the lush forests of Jharkhand. 
              Famous for its <span className="highlight">sunrise</span> and <span className="highlight">sunset points</span>, pine-covered hills, and the majestic{" "}
              <span className="highlight">Lodh Falls</span> (the highest waterfall of Jharkhand), Netarhat offers an ideal retreat for nature lovers and adventure seekers.
            </p>
          </div>
        )}

        {tab === "map" && (
          <div className="tab-content">
            <h3 className="tab-title">Location Map</h3>
            <iframe
              title="Netarhat Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.360705374605!2d84.2705!3d23.4661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b2a070e9f6e15%3A0x7b06e5f4a0b9c0f!2sNetarhat!5e0!3m2!1sen!2sin!4v1693556785123!5m2!1sen!2sin"
              className="map-frame"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <p className="map-note">
              📍 Explore the enchanting hill station of Netarhat on the map.
            </p>
          </div>
        )}

        {tab === "gallery" && (
          <div>
            <h3 className="tab-title text-center">Gallery of Netarhat</h3>
            <div className="gallery-grid">
              <div className="gallery-card">
                <img src={lodhfall} alt="Lodh Falls" className="gallery-img" />
                <div className="gallery-overlay">
                  <p>Lodh Falls</p>
                </div>
              </div>
              <div className="gallery-card">
                <img src={sunrise} alt="Sunrise Point" className="gallery-img" />
                <div className="gallery-overlay">
                  <p>Sunrise Point</p>
                </div>
              </div>
              <div className="gallery-card">
                <img src={koelsunset} alt="Koel View Point" className="gallery-img" />
                <div className="gallery-overlay">
                  <p>Koel View Sunset</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* How to Get There */}
      <div
        ref={(el) => (observedRefs.current[2] = el)}
        className="transport-section opacity-0 transition-all duration-1000"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-title">How to Get There</h2>
          <div className="transport-grid">
            <div className="transport-card">
              <div className="icon-box road">
                <FaBusAlt className="icon" />
              </div>
              <h3 className="transport-title">By Road</h3>
              <p className="transport-text">
                Netarhat is about 155 km from Ranchi and 210 km from Daltonganj. Buses and taxis regularly connect it with nearby towns.
              </p>
            </div>

            <div className="transport-card">
              <div className="icon-box train">
                <FaTrain className="icon" />
              </div>
              <h3 className="transport-title">By Train</h3>
              <p className="transport-text">
                The nearest railway station is at Latehar (about 110 km) and Ranchi Junction, both well connected to major Indian cities.
              </p>
            </div>

            <div className="transport-card">
              <div className="icon-box air">
                <FaPlaneDeparture className="icon" />
              </div>
              <h3 className="transport-title">By Air</h3>
              <p className="transport-text">
                The nearest airport is Birsa Munda Airport, Ranchi (about 156 km), with flights from Delhi, Kolkata, and Mumbai.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Attractions */}
      <div
        ref={(el) => (observedRefs.current[3] = el)}
        className="attractions-section opacity-0 transition-all duration-1000"
      >
        <h2 className="attractions-title">Nearby Attractions</h2>
        <div className="attractions-grid">
          <div className="attraction-card">
            <img src={pineforest} alt="Pine Forests" className="attraction-img" />
            <div className="attraction-info">
              <h3 className="font-semibold">Pine Forests</h3>
              <p>A scenic trail of pine-covered hills ideal for trekking and picnics.</p>
            </div>
          </div>

          <div className="attraction-card">
            <img src={koelsunset} alt="Koel River View" className="attraction-img" />
            <div className="attraction-info">
              <h3 className="font-semibold">Koel River View Point</h3>
              <p>Stunning sunset point overlooking the winding Koel River valley.</p>
            </div>
          </div>

          <div className="attraction-card">
            <img src={lodhfall} alt="Lodh Falls" className="attraction-img" />
            <div className="attraction-info">
              <h3 className="font-semibold">Lodh Falls</h3>
              <p>The highest waterfall of Jharkhand, cascading from a height of 468 feet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
