import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  return (
    <MapContainer
      center={[44.93898, 11.10523]}
      zoom={10}        // Adjust zoom level for better visibility
      style={{ height: '400px', width: '100%' }} // Style the map container
    >
      {/* OpenStreetMap base layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* NASA NDVI overlay with 50% opacity */}
      <TileLayer
        url="https://prod.glam2.app/tiles/mod09q1-ndvi/2024-09-21/{z}/{x}/{y}.png"
        attribution='&copy; NASA'
        opacity={0.5} // Set the opacity to 50%
      />
      { /* NDVI: https://prod.glam2.app/tiles/mod09q1-ndvi/2024-09-21/{z}/{x}/{y}.png
          NDWI: https://prod.glam2.app/tiles/mod09a1-ndwi/2024-09-21/{z}/{x}/{y}.png*/ }
    </MapContainer>
  );
};

export default LeafletMap;
