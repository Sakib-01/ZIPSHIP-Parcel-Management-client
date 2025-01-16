import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    // Initialize map
    const map = L.map(mapRef.current).setView([latitude, longitude], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`Parcel Location: ${latitude}, ${longitude}`).openPopup();

    // Cleanup map on component unmount
    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
    return <p className="text-red-500">Invalid coordinates provided.</p>;
  }

  return <div ref={mapRef} className="w-full h-96"></div>;
};

export default MapComponent;
