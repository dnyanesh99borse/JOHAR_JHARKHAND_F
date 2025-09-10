import React from "react";
import "./ConnectWithUs.css";

// Import your images
import fbImg from "../visualLibrary/assets/photos.jpg";
import instaImg from "../visualLibrary/assets/photos.jpg";
import twitterImg from "../visualLibrary/assets/photos.jpg";
import ytImg from "../visualLibrary/assets/photos.jpg";

// Import icons
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    img: fbImg,
    url: "#",
    color: "#1877f2",
    type: "normal",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    img: instaImg,
    url: "#",
    color: "#e4405f",
    type: "normal",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    img: twitterImg,
    url: "#",
    color: "#1da1f2",
    type: "normal",
  },
  {
    name: "Youtube",
    icon: <FaYoutube />,
    img: ytImg,
    url: "#",
    color: "#ff0000",
    type: "wide", // mark YouTube as wide
  },
];

const ConnectWithUs = () => {
  return (
    <section className="connect-section">
      <h2 className="connect-title">Connect With Us</h2>
      <div className="connect-grid">
        {socialLinks.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className={`connect-card ${
              item.type === "wide" ? "connect-card-wide" : ""
            }`}
          >
            <img src={item.img} alt={item.name} className="connect-img" />
            <div
              className="connect-overlay"
              style={{ backgroundColor: item.color }}
            >
              <div className="connect-info">
                <span className="connect-icon">{item.icon}</span>
                <span className="connect-name">{item.name}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ConnectWithUs;
