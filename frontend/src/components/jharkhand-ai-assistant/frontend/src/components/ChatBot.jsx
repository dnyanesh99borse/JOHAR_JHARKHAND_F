
// // src/components/ChatBot.jsx
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import "./ChatBot.css";
// const backendURL = "http://127.0.0.1:8000/chat";

// // Predefined offline Q&A for Jharkhand
// const offlineQA = [
//   { question: "Tell me about Jharkhand culture", answer: "Jharkhand has a rich tribal culture with traditional dances, music, and festivals. 🌿🪘" },
//   { question: "Famous tourist places in Jharkhand?", answer: "You must visit Ranchi waterfalls, Netarhat hills, and Betla National Park! 🏞️🐘" },
//   { question: "What is Jharkhand known for?", answer: "Jharkhand is known for its forests, waterfalls, and tribal heritage. 🌳🌊" },
// ];

// export default function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [listening, setListening] = useState(false);
//   const [serverOnline, setServerOnline] = useState(true);

//   const recognitionRef = useRef(null);
//   const utterRef = useRef(null);
//   const chatBoxRef = useRef(null);

//   // -----------------------
//   // 1. Check backend status
//   // -----------------------
//   useEffect(() => {
//     const checkServer = async () => {
//       try {
//         const res = await fetch(backendURL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ query: "ping" }),
//         });
//         setServerOnline(res.ok);
//       } catch {
//         setServerOnline(false);
//       }
//     };
//     checkServer();
//     const interval = setInterval(checkServer, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // -----------------------
//   // 2. Handle sending messages
//   // -----------------------
//   const handleSend = useCallback(
//     async (text, isVoice = false) => {
//       if (!text) return;
//       setMessages((prev) => [...prev, { sender: "user", text }]);
//       setInput("");

//       // Offline fallback
//       if (!serverOnline) {
//         const offlineResp = offlineQA.find((q) =>
//           q.question.toLowerCase().includes(text.toLowerCase())
//         );
//         const response = offlineResp
//           ? offlineResp.answer
//           : "⚠️ Server offline or unknown question. Please check your internet!";
//         setMessages((prev) => [...prev, { sender: "bot", text: response }]);
//         if (isVoice) speakText(response);
//         return;
//       }

//       // Online backend call
//       try {
//         setMessages((prev) => [...prev, { sender: "bot", text: "Typing..." }]);
//         const res = await axios.post(backendURL, { query: text });
//         const answer = res.data.answer;
//         setMessages((prev) => {
//           const newPrev = prev.slice(0, -1); // remove "Typing..."
//           return [...newPrev, { sender: "bot", text: answer }];
//         });
//         if (isVoice) speakText(answer);
//       } catch {
//         setMessages((prev) => {
//           const newPrev = prev.slice(0, -1);
//           return [
//             ...newPrev,
//             { sender: "bot", text: "⚠️ Server offline or busy." },
//           ];
//         });
//       }
//     },
//     [serverOnline]
//   );

//   // -----------------------
//   // 3. Voice recognition setup
//   // -----------------------
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "en-IN";
//       recognition.interimResults = false;
//       recognition.continuous = false;

//       recognition.onstart = () => setListening(true);
//       recognition.onend = () => setListening(false);
//       recognition.onerror = () => setListening(false);

//       recognition.onresult = (e) => {
//         const transcript = e.results[0][0].transcript;
//         setInput(transcript);
//         handleSend(transcript, true);
//       };

//       recognitionRef.current = recognition;
//     }
//   }, [handleSend]);

//   // -----------------------
//   // 4. Auto-scroll chat
//   // -----------------------
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // -----------------------
//   // 5. Text-to-Speech
//   // -----------------------
//   const speakText = (text) => {
//     if ("speechSynthesis" in window) {
//       if (utterRef.current) window.speechSynthesis.cancel();
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = "en-IN";
//       utter.rate = 1;
//       utter.pitch = 1;
//       utter.onend = () => {
//         utterRef.current = null;
//       };
//       utterRef.current = utter;
//       window.speechSynthesis.speak(utter);
//     }
//   };

//   // --------------------------
//   // 6. Handle Plan Trip
//   // --------------------------
//   const handlePlanTrip = useCallback(() => {
//     const target = input.trim() || "Jharkhand";
//     let days = window.prompt(
//       "How many days do you want for the trip? (default 5)",
//       "5"
//     );
//     days = days && Number(days) > 0 ? Number(days) : 5;

//     const planPrompt = `Create a personalized ${days}-day itinerary for ${target} in Jharkhand focusing on culture, eco-tourism, and experiences.
// - For each day give 1-2 short bullet points (activities), approximate travel time, and a recommended morning/afternoon/evening activity.
// - Suggest one budget-friendly accommodation type and one mid-range option.
// - Include 3 quick practical tips (transport, safety, best time to visit).
// - Keep the response concise and human-friendly, use emojis, and do not include raw markdown symbols.`;

//     handleSend(planPrompt, false);
//   }, [input, handleSend]);

//   // -----------------------
//   // UI
//   // -----------------------
//   return (
//     <div className="chat-container">
//       <div className={`status-bar ${serverOnline ? "online" : "offline"}`}>
//         {serverOnline ? "Server Online ✅" : "Server Offline ❌"}
//       </div>

//       <div className="chat-box" ref={chatBoxRef}>
//         {messages.map((m, i) => (
//           <div key={i} className={`message ${m.sender}`}>
//             {m.text}
//           </div>
//         ))}
//       </div>

//       <div className="input-box">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about Jharkhand..."
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSend(input);
//           }}
//         />
//         <button onClick={() => handleSend(input)}>Send</button>
//         <button
//           onClick={() => {
//             if (recognitionRef.current && !listening)
//               recognitionRef.current.start();
//           }}
//         >
//           {listening ? "🎤 Listening..." : "🎤 Speak"}
//         </button>
//         <button
//           onClick={() => {
//             if (utterRef.current) window.speechSynthesis.cancel();
//           }}
//         >~
//           ⏹️ Stop
//         </button>
//       </div>

//       <div className="OtherShorts">
//         <button className="plan-btn" onClick={handlePlanTrip}>
//           ✈️ Plan Trip
//         </button>
//       </div>
//     </div>
//   );
// }




















// src/components/ChatBot.jsx
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import "./ChatBot.css";

// const backendURL = "http://127.0.0.1:8000/chat";

// const offlineQA = [
//   { question: "Tell me about Jharkhand culture", answer: "Jharkhand has a rich tribal culture with traditional dances, music, and festivals. 🌿🪘" },
//   { question: "Famous tourist places in Jharkhand?", answer: "You must visit Ranchi waterfalls, Netarhat hills, and Betla National Park! 🏞️🐘" },
//   { question: "What is Jharkhand known for?", answer: "Jharkhand is known for its forests, waterfalls, and tribal heritage. 🌳🌊" },
// ];

// export default function ChatBot({ onClose }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [listening, setListening] = useState(false);
//   const [serverOnline, setServerOnline] = useState(true);

//   const recognitionRef = useRef(null);
//   const utterRef = useRef(null);
//   const chatBoxRef = useRef(null);

//   // 1) Check backend status
//   useEffect(() => {
//     const checkServer = async () => {
//       try {
//         const res = await fetch(backendURL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ query: "ping" }),
//         });
//         setServerOnline(res.ok);
//       } catch {
//         setServerOnline(false);
//       }
//     };
//     checkServer();
//     const interval = setInterval(checkServer, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // 2) Send messages
//   const handleSend = useCallback(
//     async (text, isVoice = false) => {
//       if (!text) return;
//       setMessages((prev) => [...prev, { sender: "user", text }]);
//       setInput("");

//       // Offline fallback
//       if (!serverOnline) {
//         const offlineResp = offlineQA.find((q) =>
//           q.question.toLowerCase().includes(text.toLowerCase())
//         );
//         const response = offlineResp
//           ? offlineResp.answer
//           : "⚠️ Server offline or unknown question. Please check your internet!";
//         setMessages((prev) => [...prev, { sender: "bot", text: response }]);
//         if (isVoice) speakText(response);
//         return;
//       }

//       // Online backend call
//       try {
//         setMessages((prev) => [...prev, { sender: "bot", text: "Typing..." }]);
//         const res = await axios.post(backendURL, { query: text });
//         const answer = res.data.answer;
//         setMessages((prev) => {
//           const newPrev = prev.slice(0, -1);
//           return [...newPrev, { sender: "bot", text: answer }];
//         });
//         if (isVoice) speakText(answer);
//       } catch {
//         setMessages((prev) => {
//           const newPrev = prev.slice(0, -1);
//           return [...newPrev, { sender: "bot", text: "⚠️ Server offline or busy." }];
//         });
//       }
//     },
//     [serverOnline]
//   );

//   // 3) Voice recognition
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "en-IN";
//       recognition.interimResults = false;
//       recognition.continuous = false;

//       recognition.onstart = () => setListening(true);
//       recognition.onend = () => setListening(false);
//       recognition.onerror = () => setListening(false);

//       recognition.onresult = (e) => {
//         const transcript = e.results[0][0].transcript;
//         setInput(transcript);
//         handleSend(transcript, true);
//       };

//       recognitionRef.current = recognition;
//     }
//   }, [handleSend]);

//   // 4) Auto-scroll
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // 5) Text-to-speech
//   const speakText = (text) => {
//     if ("speechSynthesis" in window) {
//       if (utterRef.current) window.speechSynthesis.cancel();
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = "en-IN";
//       utter.rate = 1;
//       utter.pitch = 1;
//       utter.onend = () => {
//         utterRef.current = null;
//       };
//       utterRef.current = utter;
//       window.speechSynthesis.speak(utter);
//     }
//   };

//   // 6) Plan Trip (keeps your original behaviour)
//   const handlePlanTrip = useCallback(() => {
//     const target = input.trim() || "Jharkhand";
//     let days = window.prompt("How many days do you want for the trip? (default 5)", "5");
//     days = days && Number(days) > 0 ? Number(days) : 5;

//     const planPrompt = `Create a personalized ${days}-day itinerary for ${target} in Jharkhand focusing on culture, eco-tourism, and experiences.
// - For each day give 1-2 short bullet points (activities), approximate travel time, and a recommended morning/afternoon/evening activity.
// - Suggest one budget-friendly accommodation type and one mid-range option.
// - Include 3 quick practical tips (transport, safety, best time to visit).
// - Keep the response concise and human-friendly, use emojis, and do not include raw markdown symbols.`;

//     handleSend(planPrompt, false);
//   }, [input, handleSend]);

//   // UI
//   return (
//     <div className="chat-container" role="region" aria-label="Chatbot">
//       {/* Small header (close button calls onClose if provided) */}
//       <div className="chat-header-inline">
//         <div className="chat-title">Jharkhand Bot</div>
//         <div className="chat-header-actions">
//           {onClose && (
//             <button className="chat-close-btn" onClick={onClose} aria-label="Close chat">✕</button>
//           )}
//         </div>
//       </div>

//       <div className={`status-bar ${serverOnline ? "online" : "offline"}`}>
//         {serverOnline ? "Server Online ✅" : "Server Offline ❌"}
//       </div>

//       <div className="chat-box" ref={chatBoxRef}>
//         {messages.map((m, i) => (
//           <div key={i} className={`message ${m.sender}`}>
//             {m.text}
//           </div>
//         ))}
//       </div>

//       <div className="input-box">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about Jharkhand..."
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSend(input);
//           }}
//         />
//         <button onClick={() => handleSend(input)}>Send</button>
//         <button
//           onClick={() => {
//             if (recognitionRef.current && !listening) recognitionRef.current.start();
//           }}
//         >
//           {listening ? "🎤 Listening..." : "🎤 Speak"}
//         </button>
//         <button onClick={() => { if (utterRef.current) window.speechSynthesis.cancel(); }}>
//           ⏹️ Stop
//         </button>
//       </div>

//       <div className="OtherShorts">
//         <button className="plan-btn" onClick={handlePlanTrip}>✈️ Plan Trip</button>
//       </div>
//     </div>
//   );
// }










// src/components/ChatBot.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./ChatBot.css";

import { FiSend } from "react-icons/fi";
import { FaMicrophone, FaStop, FaPlane } from "react-icons/fa";


// Backend API endpoint
const backendURL = "http://127.0.0.1:8000/chat";

// Predefined offline fallback Q&A
const offlineQA = [
  {
    question: "Tell me about Jharkhand culture",
    answer:
      "Jharkhand has a rich tribal culture with traditional dances, music, and festivals. 🌿🪘",
  },
  {
    question: "Famous tourist places in Jharkhand?",
    answer:
      "You must visit Ranchi waterfalls, Netarhat hills, and Betla National Park! 🏞️🐘",
  },
  {
    question: "What is Jharkhand known for?",
    answer:
      "Jharkhand is known for its forests, waterfalls, and tribal heritage. 🌳🌊",
  },
];

export default function ChatBot({ onClose }) {
  // -------------------------
  // State & References
  // -------------------------
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  const recognitionRef = useRef(null);
  const utterRef = useRef(null);
  const chatBoxRef = useRef(null);

  // -------------------------
  // 1. Check Backend Status
  // -------------------------
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(backendURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: "ping" }),
        });
        setServerOnline(res.ok);
      } catch {
        setServerOnline(false);
      }
    };
    checkServer();
    const interval = setInterval(checkServer, 5000);
    return () => clearInterval(interval);
  }, []);

  // -------------------------
  // 2. Send Messages
  // -------------------------
  const handleSend = useCallback(
    async (text, isVoice = false) => {
      if (!text.trim()) return;

      setMessages((prev) => [...prev, { sender: "user", text }]);
      setInput("");

      // Offline Fallback
      if (!serverOnline) {
        const offlineResp = offlineQA.find((q) =>
          q.question.toLowerCase().includes(text.toLowerCase())
        );
        const response = offlineResp
          ? offlineResp.answer
          : "⚠️ Server offline or unknown question. Please check your internet!";
        setMessages((prev) => [...prev, { sender: "bot", text: response }]);
        if (isVoice) speakText(response);
        return;
      }

      // Online Backend
      try {
        setMessages((prev) => [...prev, { sender: "bot", text: "Typing..." }]);
        const res = await axios.post(backendURL, { query: text });
        const answer = res.data.answer;
        setMessages((prev) => {
          const updated = prev.slice(0, -1); // remove "Typing..."
          return [...updated, { sender: "bot", text: answer }];
        });
        if (isVoice) speakText(answer);
      } catch {
        setMessages((prev) => {
          const updated = prev.slice(0, -1);
          return [...updated, { sender: "bot", text: "⚠️ Server offline or busy." }];
        });
      }
    },
    [serverOnline]
  );

  // -------------------------
  // 3. Voice Recognition
  // -------------------------
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript, true);
      };

      recognitionRef.current = recognition;
    }
  }, [handleSend]);

  // -------------------------
  // 4. Auto Scroll
  // -------------------------
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // -------------------------
  // 5. Text-to-Speech
  // -------------------------
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      if (utterRef.current) window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-IN";
      utter.rate = 1;
      utter.pitch = 1;
      utter.onend = () => {
        utterRef.current = null;
      };
      utterRef.current = utter;
      window.speechSynthesis.speak(utter);
    }
  };

  // -------------------------
  // 6. Plan Trip
  // -------------------------
  const handlePlanTrip = useCallback(() => {
    const target = input.trim() || "Jharkhand";
    let days = window.prompt(
      "How many days do you want for the trip? (default 5)",
      "5"
    );
    days = days && Number(days) > 0 ? Number(days) : 5;

    const planPrompt = `Create a personalized ${days}-day itinerary for ${target} in Jharkhand focusing on culture, eco-tourism, and experiences.
- For each day give 1-2 short bullet points (activities), approximate travel time, and a recommended morning/afternoon/evening activity.
- Suggest one budget-friendly accommodation type and one mid-range option.
- Include 3 quick practical tips (transport, safety, best time to visit).
- Keep the response concise and human-friendly, use emojis, and do not include raw markdown symbols.`;

    handleSend(planPrompt, false);
  }, [input, handleSend]);

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="chat-container" role="region" aria-label="Chatbot">
      {/* Header */}
      <div className="chat-header">
        <span className="chat-title">🤖 JHORIST -your jharkhand assitant</span>
        {onClose && (
          <button
            className="chat-close-btn"
            onClick={onClose}
            aria-label="Close chat"
          >
            ✕
          </button>
        )}
      </div>

      {/* Server Status */}
      <div className={`status-bar ${serverOnline ? "online" : "offline"}`}>
        {serverOnline ? "Server Online ✅" : "Server Offline ❌"}
      </div>

      {/* Messages */}
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Jharkhand..."
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
        />
      </div>


      {/* ===== Action buttons with react-icons ===== */}
      <div className="other-shorts">
        {/* Send */}
        <button
          className="icon-btn send-btn"
          onClick={() => handleSend(input)}
          aria-label="Send message"
          title="Send"
        >
          <FiSend size={18} />
        </button>

        {/* Microphone - toggles start/stop */}
        <button
          className={`icon-btn mic-button ${listening ? "listening" : ""}`}
          onClick={() => {
            if (!recognitionRef.current) return;
            if (!listening) recognitionRef.current.start();
            else recognitionRef.current.stop();
          }}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Start voice input"}
          title={listening ? "Stop listening" : "Speak"}
        >
          <FaMicrophone size={16} />
        </button>

        {/* Stop TTS */}
        <button
          className="icon-btn stop-btn"
          onClick={() => {
            if (utterRef.current) window.speechSynthesis.cancel();
          }}
          aria-label="Stop speech"
          title="Stop speech"
        >
          <FaStop size={16} />
        </button>

        {/* Plan Trip - pill button with icon + text */}
        <button
          className="plan-btn"
          onClick={handlePlanTrip}
          aria-label="Plan trip"
          title="Plan Trip"
        >
          <FaPlane size={16} />
          <span className="plan-text">Plan Trip</span>
        </button>
      </div>

    </div>
  );
}
