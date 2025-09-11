// src/pages/Destination/RanchiWaterfalls.jsx
import React, { useState, useEffect, useRef } from "react";
import ranchiwfbg from "./assets/ranchiwaterfall1.jpg";
import rockgarden from "./assets/rockgarden.jpg";
import tagorehill from "./assets/tagorehill.png";
import birsazoo from "./assets/birsazoo.jpg";

import { FaBusAlt, FaTrain, FaPlaneDeparture } from "react-icons/fa";

export default function RanchiWaterfalls() {
    const [tab, setTab] = useState("about");

    // Refs for observed sections
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
        <div className="font-inter">
            {/* Hero Section */}
            <div
                ref={(el) => (observedRefs.current[0] = el)}
                className="relative w-full h-[60vh] opacity-0 transition-all duration-1000"
            >
                <img
                    src={ranchiwfbg}
                    alt="Ranchi Waterfalls"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold">Ranchi Waterfalls</h1>
                    <p className="mt-2 text-lg">The natural jewels of Jharkhand</p>
                </div>
            </div>

            {/* Tabs */}
            <div
                ref={(el) => (observedRefs.current[1] = el)}
                className="max-w-6xl mx-auto px-6 py-12 opacity-0 transition-all duration-1000"
            >
                <div className="flex space-x-6 justify-center mb-8">
                    {["about", "map", "gallery"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setTab(item)}
                            className={`px-4 py-2 rounded-lg ${tab === item
                                ? "bg-orange-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
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
                    <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
                        <h3 className="text-2xl font-playfair font-semibold text-gray-800 mb-4">
                            Discover Ranchi’s Waterfalls
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Ranchi, the capital of Jharkhand, is adorned with enchanting waterfalls
                            such as <span className="font-semibold text-gray-800">Hundru</span>,{" "}
                            <span className="font-semibold text-gray-800">Dassam</span>, and{" "}
                            <span className="font-semibold text-gray-800">Jonha</span>.
                            Nestled amidst lush forests and rocky terrain, these falls offer
                            breathtaking views and a serene retreat for travelers seeking
                            nature’s embrace.
                        </p>
                    </div>
                )}

                {tab === "map" && (
                    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100">
                        <h3 className="text-2xl font-playfair font-semibold text-gray-800 mb-4">
                            Location Map
                        </h3>
                        <iframe
                            title="Ranchi Waterfalls Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.405052424904!2d85.48224247498262!3d23.360731779201223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1c5e51a8b3d%3A0xc3ad07c7c3de342e!2sHundru%20Falls!5e0!3m2!1sen!2sin!4v1693556785123!5m2!1sen!2sin"
                            className="w-full h-96 rounded-xl shadow-inner"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                        <p className="mt-4 text-gray-600 text-sm text-center">
                            📍 Explore the exact location of Ranchi’s famous waterfalls on the map.
                        </p>
                    </div>
                )}

                {tab === "gallery" && (
                    <div>
                        <h3 className="text-2xl font-playfair font-semibold text-gray-800 mb-6 text-center">
                            Gallery of Ranchi Waterfalls
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="group relative overflow-hidden rounded-xl shadow-md">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Hundru_Falls%2C_Ranchi.jpg"
                                    alt="Hundru Falls"
                                    className="object-cover w-full h-64 transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <p className="text-white text-lg font-semibold">Hundru Falls</p>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-xl shadow-md">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Dassam_Falls.jpg"
                                    alt="Dassam Falls"
                                    className="object-cover w-full h-64 transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <p className="text-white text-lg font-semibold">Dassam Falls</p>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-xl shadow-md">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Jonha_Falls.jpg"
                                    alt="Jonha Falls"
                                    className="object-cover w-full h-64 transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <p className="text-white text-lg font-semibold">Jonha Falls</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div
                ref={(el) => (observedRefs.current[2] = el)}
                className="bg-gradient-to-br from-gray-50 to-white py-16 opacity-0 transition-all duration-1000"
            >
                <div className="max-w-6xl mx-auto px-6">
                    {/* Heading */}
                    <h2 className="text-3xl font-playfair font-semibold text-gray-800 mb-10 text-center tracking-wide">
                        How to Get There
                    </h2>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* By Road */}
                        <div className="flex flex-col items-center text-center bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-orange-100 text-orange-600 p-4 rounded-full mb-4">
                                <FaBusAlt className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                By Road
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ranchi is well connected via highways with frequent state-run and
                                private bus services linking major cities.
                            </p>
                        </div>

                        {/* By Train */}
                        <div className="flex flex-col items-center text-center bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
                                <FaTrain className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                By Train
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ranchi Junction is a major rail hub connecting Delhi, Kolkata,
                                Patna, and other Indian cities with regular express trains.
                            </p>
                        </div>

                        {/* By Air */}
                        <div className="flex flex-col items-center text-center bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                                <FaPlaneDeparture className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                By Air
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Birsa Munda Airport (IXR) offers direct flights to Delhi, Mumbai,
                                Kolkata, and other metros, making air travel convenient.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nearby Attractions */}
            <div
                ref={(el) => (observedRefs.current[3] = el)}
                className="max-w-6xl mx-auto px-6 py-12 opacity-0 transition-all duration-1000"
            >
                <h2 className="text-2xl font-semibold mb-8">Nearby Attractions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                        <img
                            src={rockgarden}
                            alt="Rock Garden Ranchi"
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">Rock Garden</h3>
                            <p className="text-sm text-gray-600">
                                A scenic viewpoint with unique rock formations overlooking Kanke
                                Dam.
                            </p>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                        <img
                            src={tagorehill}
                            alt="Tagore Hill"
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">Tagore Hill</h3>
                            <p className="text-sm text-gray-600">
                                Historic hill named after Rabindranath Tagore, offering serene
                                views.
                            </p>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                        <img
                            src={birsazoo}
                            alt="Birsa Zoological Park"
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">Birsa Zoological Park</h3>
                            <p className="text-sm text-gray-600">
                                A vast zoo and rescue center with wildlife like tigers,
                                leopards, and elephants.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
