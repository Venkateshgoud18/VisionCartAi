"use client";

import { useState } from "react";

export default function Location() {
  const [city, setCity] = useState("Not set");
  const [status, setStatus] = useState("");

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported by browser");
      return;
    }

    setStatus("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Coords:", latitude, longitude);

        // ⚠️ Geolocation gives coords, NOT city
        // For now, mock mapping:
        setCity("Hyderabad");
        setStatus("");
      },
      (error) => {
        console.error(error);

        if (error.code === 1) {
          setStatus("Location permission denied");
        } else if (error.code === 2) {
          setStatus("Position unavailable");
        } else if (error.code === 3) {
          setStatus("Location request timed out");
        }
      }
    );
  };

  return (
    <div className="rounded-xl bg-white text-black p-4 shadow">
      <p className="text-sm text-gray-500">Delivering to</p>
      <h3 className="text-lg font-semibold">{city}</h3>

      <button
        onClick={detectLocation}
        className="mt-2 rounded-lg bg-black px-3 py-1 text-sm text-white hover:bg-gray-800"
      >
        Use Current Location
      </button>

      {status && (
        <p className="mt-2 text-xs text-red-500">{status}</p>
      )}
    </div>
  );
}
