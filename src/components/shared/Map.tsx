'use client';
import 'leaflet/dist/leaflet.css';
import { TileLayer } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';

const position: [number, number] = [16.757, 81.6817];

const Map = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <>
      <MapContainer className="h-full w-full" center={position} zoom={15}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
};

export default Map;
