// src/components/Destinations.jsx
import React, { useRef } from "react";
import "./Destinations.css"; // external CSS
import { ChevronLeft, ChevronRight } from "lucide-react"; //for backward and forward buttons
import { useNavigate } from "react-router-dom";


// import local image(s)
import Netarhat from "../topdestinations/assets/netarhat.png";
import Dalma_wildlife_Sanctuary from "../topdestinations/assets/dalmawildlife.png";
// import Dalma from "../topdestinations/assets/dalma.png";
import Parasnath from "../topdestinations/assets/parasnath.png";
import Maithon_Dam from "../topdestinations/assets/Maithon_Dam.png";
import Maluti_Temple from "../topdestinations/assets/Maluti_Temple.png";
import Ranchi_Waterfalls from "../topdestinations/assets/ranchiwaterfall1.jpg";
import { Navigate } from "react-router-dom";

const slides = [
    {
        title: "Dalma Wildlife Sanctuary 🐘—",
        image: Dalma_wildlife_Sanctuary,
        description:
            "A sprawling sanctuary near Jamshedpur, Dalma is home to majestic elephants 🐘, leopards, deer, and rare birds. Trekking through its hills while soaking in panoramic views makes it a paradise for wildlife lovers & adventure seekers."
    },
    {
        title: "Ranchi Waterfalls 🌊—",
        image: Ranchi_Waterfalls,
        description:
            "Ranchi, the ‘City of Waterfalls’, is adorned with gems like Hundru, Dassam, Jonha, and Panchghagh. Each fall roars with monsoon energy 💦, set against forest backdrops, making Jharkhand a nature lover’s dream destination."
    },
    {
        title: "Netarhat 🌄—",
        image: Netarhat,
        description:
            "“Queen of Jharkhand Hills”—is a serene hill station of pine forests, rolling plateaus & glowing sunrises. Santhal greetings of “Johar!” 🤝, tribal culture, and nearby Lodh Falls make it a perfect blend of nature & heritage."
    },
    {
        title: "Maluti Temples 🛕—",
        image: Maluti_Temple,
        description:
            "A cluster of nearly 72 terracotta temples, Maluti is a hidden heritage gem near Dumka. Intricate carvings narrate epic tales of Ramayana & Mahabharata, reflecting the glorious art and devotion of medieval Bengal-Jharkhand traditions."
    },
    {
        title: "Parasnath Hills ⛰️—",
        image: Parasnath,
        description:
            "The highest peak of Jharkhand and one of the most sacred Jain pilgrimage sites. Known as Sammed Shikharji, it’s believed 20 Jain Tirthankaras attained salvation here. Pilgrims and trekkers alike find peace amid clouds & devotion."
    },
    {
        title: "Maithon Dam 💧—",
        image: Maithon_Dam,
        description:
            "Popularly called the ‘Lake of Damodar Valley’, Maithon Dam is surrounded by scenic hills and lush greenery. Boating on its vast reservoir during sunset creates a picture-perfect memory for families, couples, and wanderers alike."
    },
];


export default function Destinations() {
    const navigate = useNavigate();

    const sliderRef = useRef(null);

    const handleClick = (direction) => {
        const slider = sliderRef.current;
        const items = slider.querySelectorAll(".item");
        if (direction === "next") {
            slider.appendChild(items[0]);
        } else {
            slider.prepend(items[items.length - 1]);
        }
    };

    return (
        <section className="blurbg">
            <div className="sectitle">
                <p className="titletext">Hidden Gems of the Tribal Heartland</p>
            </div>
            <main className="dest-main">
                <ul className="slider" ref={sliderRef}>
                    {slides.map((s, idx) => (
                        <li
                            key={idx}
                            className="item"
                            /* must be `url(...)` */
                            style={{ backgroundImage: `url(${s.image})` }}
                        >
                            <div className="content">
                                <h2 className="title">{s.title}</h2>
                                <p className="description">{s.description}</p>
                                <button onClick={() => navigate("/maluti-temples")}>Read More</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <nav className="nav">
                    <button className="button prev" onClick={() => handleClick("prev")}>
                        <ChevronLeft size={32} color="white" />
                    </button>
                    <button className="button next" onClick={() => handleClick("next")}>
                        <ChevronRight size={32} color="white" />
                    </button>
                </nav>


            </main>
        </section>
    );
}
