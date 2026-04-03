"use client";

import { useState } from "react";

export default function Location() {
  const [city, setCity] = useState("Hyderabad, TS");
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const detectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("🛰️ Syncing with satellites...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Geolocation Success:", latitude, longitude);
        // In a real app, you'd use a reverse geocoding API here.
        setCity("Hyderabad, TS");
        setStatus("✅ Location synchronized successfully.");
        
        // Clear status after 3 seconds
        setTimeout(() => setStatus(""), 3000);
      },
      (error) => {
        console.error("Geolocation Error:", error);

        if (error.code === 1) {
          setStatus("❌ Permission denied. Please enable location in browser settings.");
        } else if (error.code === 2) {
          setStatus("⚠️ Position unavailable (Internal error).");
        } else if (error.code === 3) {
          setStatus("⏳ Request timed out. Connectivity might be weak.");
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleManualUpdate = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-2xl transition hover:bg-white/10 max-w-sm">
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-500/20 transition duration-500 pointer-events-none"></div>
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
            📍
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest leading-none mb-1">
              Live Logistics
            </p>
            {isEditing ? (
              <input 
                autoFocus
                className="bg-transparent border-b border-cyan-500/50 text-white font-black text-lg focus:outline-none w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleManualUpdate}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <h3 
                onClick={() => setIsEditing(true)}
                className="text-lg font-black text-white tracking-tight cursor-pointer hover:text-cyan-400 transition"
              >
                {city}
              </h3>
            )}
          </div>
        </div>
        
        <button
          onClick={detectLocation}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition group"
          title="Detect Current Location"
        >
          <span className="block transition group-hover:rotate-45">🧭</span>
        </button>
      </div>

      {status && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border flex items-center gap-2 ${
            status.includes('❌') || status.includes('⚠️') 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
          }`}>
            {status}
          </p>
        </div>
      )}

      {!status && (
        <p className="mt-4 text-[11px] text-gray-500 font-medium italic">
          Click the compass or City name to update delivery zone.
        </p>
      )}
    </div>
  );
}

