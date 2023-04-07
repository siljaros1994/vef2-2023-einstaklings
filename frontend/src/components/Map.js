import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const Map = ({ position, zoom, onPositionChange }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView(position, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.marker(position, { draggable: true }).addTo(map);

      marker.on('dragend', () => {
        const newPosition = marker.getLatLng();
        onPositionChange(newPosition);
      });

      return () => {
        map.remove();
      };
    }
  }, [position, zoom, onPositionChange]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default Map;
