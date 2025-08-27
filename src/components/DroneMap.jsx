import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Drone from "../assets/Drone.svg";
import useDroneStore from "../store/droneStore";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhhbGppZm9yYXQiLCJhIjoiY21lb3l5d3pnMGpoeTJ3cXZqeHpnejhnMiJ9.vVJfOVHNbMcAjon9q-p0xQ";

export default function DroneMap({ drones, onMapReady }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const pathsRef = useRef({});
  const { selectedDrone, setSelectedDrone } = useDroneStore();

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [35.91, 31.95],
      zoom: 10,
    });

    mapRef.current.on("load", () => {
      if (onMapReady) onMapReady();
    });
  }, [onMapReady]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapRef.current.isStyleLoaded()) {
      mapRef.current.on("load", () => updateDrones());
    } else {
      updateDrones();
    }

    function updateDrones() {
      Object.values(drones).forEach((drone) => {
      
        const regId = drone.info.properties.registration;
        const coords = drone.path[drone.path.length - 1];
        const [lng, lat] = coords;
        const reg = drone.info.properties.registration;
        const isAllowed = reg.split('-')[1].startsWith('B');

        const yaw = drone.info.properties.yaw || 0;

        // ====== Update Marker ======
        if (markersRef.current[regId]) {
          markersRef.current[regId].setLngLat([lng, lat]);
          const pointer = markersRef.current[regId]
            .getElement()
            .querySelector(".arrow-pointer");
          if (pointer) pointer.style.transform = `rotate(${yaw}deg)`;
        } else {
          // ====== Marker Container ======
          const el = document.createElement("div");
          el.className = "relative w-6 h-6 cursor-pointer";

          const circle = document.createElement("div");
          circle.className = `absolute top-[2px] left-[2px] w-[22px] h-[22px] rounded-full shadow-md overflow-hidden ${
            isAllowed ? "bg-green-500" : "bg-red-600"
          }`;

          // Drone icon inside circle
          const droneImage = document.createElement("img");
          droneImage.src = Drone;
          droneImage.className =
            "absolute top-1/2 left-1/2 w-[14px] h-[14px] transform -translate-x-1/2 -translate-y-1/2 filter invert opacity-90";
          circle.appendChild(droneImage);

          // ====== Pointer (triangle + rotation) ======
          const pointer = document.createElement("div");
          pointer.className = "arrow-pointer absolute w-[26px] h-[26px]";
          pointer.style.transform = `rotate(${yaw}deg)`;
          pointer.style.transformOrigin = "center";

          const triangle = document.createElement("div");
          triangle.className =
            "absolute left-1/2 transform -translate-x-1/2 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent";
          triangle.style.top = "-8px";
          triangle.style.borderBottom = `7px solid ${
            isAllowed ? "#22c55e" : "#dc2626"
          }`;

          pointer.appendChild(triangle);
          el.appendChild(circle);
          el.appendChild(pointer);

          // ====== Popup ======
          if (!drone.startTime) drone.startTime = Date.now();
          const flightTime = new Date(drone.startTime).toLocaleTimeString();

          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: "black-arrow-popup",
          }).setHTML(`
            <div class="bg-[#0b0b0b] text-white p-3 rounded-lg shadow-lg min-w-44 relative ml-14">
              <div class="text-lg font-semibold mb-2 ml-2">${drone.info.properties.Name}</div>
              <div class="flex justify-between gap-x-4">
                <div class="flex flex-col ml-2">
                  <span class="text-gray-400 text-sm">Altitude</span>
                  <span class="font-mono text-sm">${drone.info.properties.altitude} m</span>
                </div>
                <div class="flex flex-col ml-2">
                  <span class="text-gray-400 text-sm">Flight Time:</span>
                  <span class="font-mono text-sm">${flightTime}</span>
                </div>
              </div>
            </div>
          `);

          const style = document.createElement("style");
          style.textContent = `
            .black-arrow-popup .mapboxgl-popup-tip {
              border-top-color: #0b0b0b !important;
              border-left-width: 16px !important;
              border-right-width: 16px !important;
              border-top-width: 18px !important;
            }
          `;
          document.head.appendChild(style);

          popup.on("open", () => {
            const popupElement = document.querySelector(
              ".mapboxgl-popup-content"
            );
            if (popupElement) {
              popupElement.style.background = "transparent";
              popupElement.style.padding = "0";
              popupElement.style.boxShadow = "none";
            }
          });

          const marker = new mapboxgl.Marker(el)
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(mapRef.current);

          el.addEventListener("click", () => setSelectedDrone(regId));
          markersRef.current[regId] = marker;
        }

        // ====== Paths ======
        if (pathsRef.current[regId] && mapRef.current.getSource(`line-${regId}`)) {
          mapRef.current.getSource(`line-${regId}`).setData({
            type: "Feature",
            geometry: { type: "LineString", coordinates: drone.path },
          });
        } else if (!pathsRef.current[regId]) {
          mapRef.current.addSource(`line-${regId}`, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "LineString", coordinates: drone.path },
            },
          });

          mapRef.current.addLayer({
            id: `line-${regId}`,
            type: "line",
            source: `line-${regId}`,
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": isAllowed ? "green" : "red",
              "line-width": 2,
            },
          });

          pathsRef.current[regId] = true;
        }
      });
    }
  }, [drones, setSelectedDrone]);

  useEffect(() => {
    if (selectedDrone && markersRef.current[selectedDrone]) {
      const lngLat = markersRef.current[selectedDrone].getLngLat();
      mapRef.current.flyTo({ center: lngLat, zoom: 13 });
    }
  }, [selectedDrone]);

  return <div ref={mapContainer} className="h-screen w-full" />;
}
