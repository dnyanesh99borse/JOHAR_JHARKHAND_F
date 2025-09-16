import React, { useState, useEffect, useRef } from "react";
import ranchiwfbg from "./assets/ranchiwaterfall1.jpg";
import rockgarden from "./assets/rockgarden.jpg";
import tagorehill from "./assets/tagorehill.png";
import birsazoo from "./assets/birsazoo.jpg";
import hundrufall from "./assets/hundrufalls.jpg";
import dassamfall from "./assets/dassamfalls.jpg";
import jonhafall from "./assets/jonhafalls.jpg";    

import { FaBusAlt, FaTrain, FaPlaneDeparture } from "react-icons/fa";

// Import CSS
import "./TourismPlaces.css";

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
        <div className="ranchi-container font-inter">
            {/* Hero Section */}
            <div
                ref={(el) => (observedRefs.current[0] = el)}
                className="hero-section opacity-0 transition-all duration-1000"
            >
                <img
                    src={ranchiwfbg}
                    alt="Ranchi Waterfalls"
                    className="hero-image"
                />
                <div className="hero-overlay">
                    <h1 className="hero-title">Ranchi Waterfalls</h1>
                    <p className="hero-subtitle">The natural jewels of Jharkhand</p>
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
                        <h3 className="tab-title">
                            Discover Ranchi’s Waterfalls
                        </h3>
                        <p className="tab-text">
                            Ranchi, the capital of Jharkhand, is adorned with enchanting waterfalls
                            such as <span className="highlight">Hundru</span>,{" "}
                            <span className="highlight">Dassam</span>, and{" "}
                            <span className="highlight">Jonha</span>.
                            Nestled amidst lush forests and rocky terrain, these falls offer
                            breathtaking views and a serene retreat for travelers seeking
                            nature’s embrace.
                        </p>
                    </div>
                )}

                {tab === "map" && (
                    <div className="tab-content">
                        <h3 className="tab-title">Location Map</h3>
                        <iframe
                            title="Ranchi Waterfalls Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.405052424904!2d85.48224247498262!3d23.360731779201223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1c5e51a8b3d%3A0xc3ad07c7c3de342e!2sHundru%20Falls!5e0!3m2!1sen!2sin!4v1693556785123!5m2!1sen!2sin"
                            className="map-frame"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                        <p className="map-note">
                            📍 Explore the exact location of Ranchi’s famous waterfalls on the map.
                        </p>
                    </div>
                )}

                {tab === "gallery" && (
                    <div>
                        <h3 className="tab-title text-center">Gallery of Ranchi Waterfalls</h3>
                        <div className="gallery-grid">
                            <div className="gallery-card">
                                <img
                                    src={hundrufall}
                                    alt="Hundru Falls"
                                    className="gallery-img"
                                />
                                <div className="gallery-overlay">
                                    <p>Hundru Falls</p>
                                </div>
                            </div>

                            <div className="gallery-card">
                                <img
                                    src={dassamfall}
                                    alt="Dassam Falls"
                                    className="gallery-img"
                                />
                                <div className="gallery-overlay">
                                    <p>Dassam Falls</p>
                                </div>
                            </div>

                            <div className="gallery-card">
                                <img
                                    src={jonhafall}
                                    alt="Jonha Falls"
                                    className="gallery-img"
                                />
                                <div className="gallery-overlay">
                                    <p>Jonha Falls</p>
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
                    <h2 className="section-title">
                        How to Get There
                    </h2>

                    <div className="transport-grid">
                        {/* By Road */}
                        <div className="transport-card">
                            <div className="icon-box road">
                                <FaBusAlt className="icon" />
                            </div>
                            <h3 className="transport-title">By Road</h3>
                            <p className="transport-text">
                                Ranchi is well connected via highways with frequent state-run and
                                private bus services linking major cities.
                            </p>
                        </div>

                        {/* By Train */}
                        <div className="transport-card">
                            <div className="icon-box train">
                                <FaTrain className="icon" />
                            </div>
                            <h3 className="transport-title">By Train</h3>
                            <p className="transport-text">
                                Ranchi Junction is a major rail hub connecting Delhi, Kolkata,
                                Patna, and other Indian cities with regular express trains.
                            </p>
                        </div>

                        {/* By Air */}
                        <div className="transport-card">
                            <div className="icon-box air">
                                <FaPlaneDeparture className="icon" />
                            </div>
                            <h3 className="transport-title">By Air</h3>
                            <p className="transport-text">
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
                className="attractions-section opacity-0 transition-all duration-1000"
            >
                <h2 className="attractions-title">Nearby Attractions</h2>
                <div className="attractions-grid">
                    <div className="attraction-card">
                        <img
                            src={rockgarden}
                            alt="Rock Garden Ranchi"
                            className="attraction-img"
                        />
                        <div className="attraction-info">
                            <h3 className="font-semibold">Rock Garden</h3>
                            <p>
                                A scenic viewpoint with unique rock formations overlooking Kanke Dam.
                            </p>
                        </div>
                    </div>

                    <div className="attraction-card">
                        <img
                            src={tagorehill}
                            alt="Tagore Hill"
                            className="attraction-img"
                        />
                        <div className="attraction-info">
                            <h3 className="font-semibold">Tagore Hill</h3>
                            <p>
                                Historic hill named after Rabindranath Tagore, offering serene views.
                            </p>
                        </div>
                    </div>

                    <div className="attraction-card">
                        <img
                            src={birsazoo}
                            alt="Birsa Zoological Park"
                            className="attraction-img"
                        />
                        <div className="attraction-info">
                            <h3 className="font-semibold">Birsa Zoological Park</h3>
                            <p>
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














// import React, { useState } from "react";
// import ranchiwfbg from "./assets/ranchiwaterfall1.jpg";
// import rockgarden from "./assets/rockgarden.jpg";
// import tagorehill from "./assets/tagorehill.png";
// import birsazoo from "./assets/birsazoo.jpg";
// import hundrufall from "./assets/hundrufalls.jpg";
// import dassamfall from "./assets/dassamfalls.jpg";
// import jonhafall from "./assets/jonhafalls.jpg";

// import { FaBusAlt, FaTrain, FaPlaneDeparture } from "react-icons/fa";

// export default function RanchiWaterfalls() {
//   const [tab, setTab] = useState("about");

//   return (
//     <div className="font-inter">
//       {/* Hero Section */}
//       <div className="relative w-full h-[70vh] overflow-hidden animate-fadeInUp">
//         <img
//           src={ranchiwfbg}
//           alt="Ranchi Waterfalls"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-2">
//             Ranchi Waterfalls
//           </h1>
//           <p className="text-lg md:text-2xl">
//             The natural jewels of Jharkhand
//           </p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="max-w-5xl mx-auto px-6 py-10 animate-fadeInUp">
//         <div className="flex justify-center gap-4 mb-8">
//           {["about", "map", "gallery"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setTab(item)}
//               className={`px-4 py-2 rounded-full border transition ${
//                 tab === item
//                   ? "bg-orange-500 text-white border-orange-500"
//                   : "bg-white text-gray-600 border-gray-300 hover:bg-orange-100"
//               }`}
//             >
//               {item === "about"
//                 ? "About Place"
//                 : item === "map"
//                 ? "Map"
//                 : "Gallery"}
//             </button>
//           ))}
//         </div>

//         {tab === "about" && (
//           <div className="text-center space-y-4 animate-fadeInUp">
//             <h3 className="text-2xl font-semibold">Discover Ranchi’s Waterfalls</h3>
//             <p className="text-gray-700 leading-relaxed">
//               Ranchi, the capital of Jharkhand, is adorned with enchanting
//               waterfalls such as{" "}
//               <span className="font-semibold text-orange-600">Hundru</span>,{" "}
//               <span className="font-semibold text-orange-600">Dassam</span>, and{" "}
//               <span className="font-semibold text-orange-600">Jonha</span>.
//               Nestled amidst lush forests and rocky terrain, these falls offer
//               breathtaking views and a serene retreat for travelers seeking
//               nature’s embrace.
//             </p>
//           </div>
//         )}

//         {tab === "map" && (
//           <div className="text-center space-y-4 animate-fadeInUp">
//             <h3 className="text-2xl font-semibold">Location Map</h3>
//             <iframe
//               title="Ranchi Waterfalls Map"
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.405052424904!2d85.48224247498262!3d23.360731779201223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1c5e51a8b3d%3A0xc3ad07c7c3de342e!2sHundru%20Falls!5e0!3m2!1sen!2sin!4v1693556785123!5m2!1sen!2sin"
//               className="w-full h-[400px] rounded-lg shadow-lg"
//               allowFullScreen=""
//               loading="lazy"
//             ></iframe>
//             <p className="text-gray-600">
//               📍 Explore the exact location of Ranchi’s famous waterfalls on the
//               map.
//             </p>
//           </div>
//         )}

//         {tab === "gallery" && (
//           <div className="animate-fadeInUp">
//             <h3 className="text-2xl font-semibold text-center mb-6">
//               Gallery of Ranchi Waterfalls
//             </h3>
//             <div className="grid md:grid-cols-3 gap-6">
//               {[{ img: hundrufall, name: "Hundru Falls" },
//                 { img: dassamfall, name: "Dassam Falls" },
//                 { img: jonhafall, name: "Jonha Falls" }].map((item) => (
//                 <div
//                   key={item.name}
//                   className="relative overflow-hidden rounded-xl shadow-lg group"
//                 >
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     className="w-full h-64 object-cover transform group-hover:scale-110 transition"
//                   />
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                     <p className="text-white text-lg font-semibold">
//                       {item.name}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* How to Get There */}
//       <div className="max-w-6xl mx-auto px-6 py-12 animate-fadeInUp">
//         <h2 className="text-3xl font-bold text-center mb-10">How to Get There</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center">
//             <FaBusAlt className="text-4xl text-orange-600 mx-auto mb-4" />
//             <h3 className="font-semibold text-lg mb-2">By Road</h3>
//             <p className="text-gray-600">
//               Ranchi is well connected via highways with frequent state-run and
//               private bus services linking major cities.
//             </p>
//           </div>
//           <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center">
//             <FaTrain className="text-4xl text-orange-600 mx-auto mb-4" />
//             <h3 className="font-semibold text-lg mb-2">By Train</h3>
//             <p className="text-gray-600">
//               Ranchi Junction is a major rail hub connecting Delhi, Kolkata,
//               Patna, and other Indian cities with regular express trains.
//             </p>
//           </div>
//           <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center">
//             <FaPlaneDeparture className="text-4xl text-orange-600 mx-auto mb-4" />
//             <h3 className="font-semibold text-lg mb-2">By Air</h3>
//             <p className="text-gray-600">
//               Birsa Munda Airport (IXR) offers direct flights to Delhi, Mumbai,
//               Kolkata, and other metros, making air travel convenient.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Nearby Attractions */}
//       <div className="max-w-6xl mx-auto px-6 py-12 animate-fadeInUp">
//         <h2 className="text-3xl font-bold text-center mb-10">
//           Nearby Attractions
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {[{ img: rockgarden, name: "Rock Garden", desc: "A scenic viewpoint with unique rock formations overlooking Kanke Dam." },
//             { img: tagorehill, name: "Tagore Hill", desc: "Historic hill named after Rabindranath Tagore, offering serene views." },
//             { img: birsazoo, name: "Birsa Zoological Park", desc: "A vast zoo and rescue center with wildlife like tigers, leopards, and elephants." }]
//             .map((item) => (
//             <div
//               key={item.name}
//               className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
//             >
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
