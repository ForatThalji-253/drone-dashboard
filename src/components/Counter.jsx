
import React from "react";

export default function Counter({ drones }) {
  const droneList = Object.entries(drones);
  
  const total = droneList.length;
  const allowed = droneList.filter(([serial]) => serial.startsWith("B")).length;
  const notAllowed = total - allowed;

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
