import React from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MdFlag } from "react-icons/md";

const LeafletMap = (props) => {
  const { overlay, mapPos } = props;

  const [coordinates, setCoordinates] = useState(mapPos);
  useEffect(() => {
    setCoordinates(mapPos);
  }, [mapPos]);

  const apiUrls = {
    Vegetation:
      'https://prod.glam2.app/tiles/mod09q1-ndvi/2024-09-21/{z}/{x}/{y}.png', // NDVI
    Water:
      'https://prod.glam2.app/tiles/mod09a1-ndwi/2024-09-21/{z}/{x}/{y}.png', // NDWI
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapPos);
    }, [mapPos, map]);
    return null;
  };

  return (
    <MapContainer
      center={coordinates}
      zoom={10}
      style={{ height: '400px', width: '100%' }}
    >
      <MapUpdater />
      {/* OpenStreetMap base layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} />

      {/* NASA NDVI overlay with 50% opacity */}
      <TileLayer
        url={apiUrls[overlay]}
        attribution="&copy; NASA"
        opacity={0.5}
      />
    </MapContainer>
  );
};

export default LeafletMap;