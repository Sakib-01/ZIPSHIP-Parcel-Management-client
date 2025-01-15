import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
// import L from "leaflet";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import { MapContainer } from "react-leaflet/MapContainer";
// import { TileLayer } from "react-leaflet/TileLayer";
// import { useMap } from "react-leaflet/hooks";
// import { Marker, Popup } from "react-leaflet";

// Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

const MapComponent = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return <p className="text-red-500">Invalid coordinates provided.</p>;
  }

  console.log(longitude, latitude);
  // const position = [latitude, longitude];
  const position = [51.505, -0.09];

  return (
    <div className="w-full h-96">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Parcel Location: {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
