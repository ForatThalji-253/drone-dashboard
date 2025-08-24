import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// ضع هنا مفتاح API من Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidGhhbGppZm9yYXQiLCJhIjoiY21lb3l5d3pnMGpoeTJ3cXZqeHpnejhnMiJ9.vVJfOVHNbMcAjon9q-p0xQ';

export default function DroneMap({ drones }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // إذا الخريطة موجودة، لا تنشئها ثانية

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [35.91, 31.95], // عمّان مثلًا
      zoom: 10,
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      className="flex-1"
      style={{ height: "100vh", width: "100%" }}
    />
  );
}
