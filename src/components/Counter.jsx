
import React from "react";

export default function Counter({ drones }) {
  const droneList = Object.entries(drones);
  
  const notAllowed = droneList.filter(([serial, drone]) => {
    const reg = drone.info.properties.registration;
    return !reg.split('-')[1].startsWith('B');
  }).length;

  return (
    <div className="fixed bottom-4 right-4 bg-[#d9d9d9] bg-opacity-80 text-white p-4 rounded-lg border border-gray-700 w-34 h-8 flex items-center">
      <p className="text-black text-xs flex items-center gap-2">
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#1f2327] text-white text-xs font-bold">
          {notAllowed}
        </span>
        Drone Flying
      </p>
    </div>
  );
}
