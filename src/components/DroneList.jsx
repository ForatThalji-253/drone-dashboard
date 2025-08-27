import { useState } from "react";
import useDroneStore from "../store/droneStore";
import { X } from "lucide-react";
import Dash from "../assets/Dash.svg";
import Map from "../assets/Map.svg";

export default function DroneList({ drones }) {
  const { selectedDrone, setSelectedDrone } = useDroneStore();
  const droneList = Object.entries(drones);
  const [showList, setShowList] = useState(true);

  return (
    <div className="flex flex-col md:flex-row gap-1 bg-[#313332] h-full">
      {/* ===== Sidebar Tabs ===== */}
      <div className="w-full md:w-18 bg-[#111111] text-white flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        <button className="p-2 mt-0 md:mt-16 text-[10px] whitespace-nowrap flex-shrink-0 flex flex-col items-center justify-center">
          <img src={Dash} alt="Logo" className="w-5 h-5 text-gray-300 mb-1" />
          Dashboard
        </button>

        <button className="p-2 text-[10px] whitespace-nowrap flex-shrink-0 bg-[#272727] border-l-4 flex flex-col items-center justify-center border-red-700">
          <img src={Map} alt="Logo" className="w-5 h-5 text-gray-300 mb-1" />
          Map
        </button>
      </div>

      {/* ===== Drone List ===== */}
      {showList && (
        <div className="w-full md:w-60 bg-[#111111] text-white p-2 md:p-4 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto mt-2 md:mt-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="flex justify-between items-center">
              <h2 className="text-xs md:text-sm font-bold">DRONE FLYING</h2>
              <button
                className="p-1 bg-[#777777] rounded-full"
                onClick={() => setShowList(false)}
              >
                <X className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-col sm:flex-row gap-1">
              <div className="flex flex-col">
                <p className="text-xs mt-2 mb-2 mr-0 sm:mr-10">Drones</p>
                <div className="h-1 bg-red-700 w-12"></div>
              </div>
              <p className="text-xs mt-2 mb-2 text-gray-500">Flights History</p>
            </div>

            {droneList.length === 0 && (
              <p className="text-xs md:text-sm">No drones connected</p>
            )}

            <ul>
              {droneList.map(([serial, drone]) => {
                const reg = drone.info.properties.registration;
                 
                const isAllowed = reg.split('-')[1].startsWith('B');

                const { registration, pilot, organization, Name } =
                  drone.info.properties;
                const isSelected = selectedDrone === serial;

                return (
                  <li
                    key={serial}
                    className={`mb-2 md:mb-4 p-2 md:p-3 rounded cursor-pointer flex flex-col gap-1 
                      ${isSelected ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    onClick={() => setSelectedDrone(serial)}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-xs md:text-sm truncate">
                        {Name}
                      </span>
                      <span
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          isAllowed ? "bg-[#5cfc00]" : "bg-[#f81320]"
                        }`}
                      ></span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 md:gap-x-4 gap-y-1">
                      <div className="text-xs text-gray-300 mb-2">
                        <p>Serial #</p>
                        <p className="truncate"> {drone.info.properties.serial}</p>
                      </div>
                      <div className="text-xs text-gray-300 mb-2">
                        <p>Registration #</p>
                        <p className="truncate">{reg}</p>
                      </div>
                      <div className="text-xs text-gray-300 mb-2">
                        <p>Pilot</p>
                        <p className="truncate">{pilot || "Unknown"}</p>
                      </div>
                      <div className="text-xs text-gray-300 mb-2">
                        <p>Organization</p>
                        <p className="truncate">{organization || "Unknown"}</p>
                      </div>
                    </div>

                    <hr className="h-1 bg-[#272727] border-0 w-full" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
