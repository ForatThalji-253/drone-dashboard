import { useEffect, useState, useCallback } from "react";
import useWebSocket from "./hooks/useWebSocket";
import DroneMap from "./components/DroneMap";
import DroneList from "./components/DroneList";
import Counter from "./components/Counter";
import Header from "./components/Header";
import 'mapbox-gl/dist/mapbox-gl.css';
import useDroneStore from "./store/droneStore";
import giphy from "./assets/giphy.gif";
import SagerLogo from "./assets/SagerLogo.svg";

function App() {
  const [drones, setDrones] = useState({});
  const { selectedDrone, setSelectedDrone } = useDroneStore();

  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  
  const handleNewDroneData = useCallback((data) => {
    setDataReady(true);  
    setDrones((prev) => {
      const updated = { ...prev };

      data.features.forEach((drone) => {
        const serial = drone.properties.serial;
        const coords = drone.geometry.coordinates;

        if (updated[serial]) {
          updated[serial] = {
            ...updated[serial],
            info: drone,
            path: [...updated[serial].path, coords],
          };
        } else {
          updated[serial] = {
            info: drone,
            path: [coords],
          };
        }
      });

      return updated;
    });
  }, []);

  useWebSocket(handleNewDroneData);

  useEffect(() => {
    if (mapReady && dataReady) {
      setLoading(false);
    }
  }, [mapReady, dataReady]);

  return (
    <div className="flex h-screen w-full">
     
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
         
          <img src={giphy} alt="Logo" className="w-32 h-32 animate-pulse" />
           <img src={SagerLogo} alt="Logo" className="w-45 h-45 animate-pulse" />
          
        </div>
      )}

     
      <Header />
      <DroneList drones={drones} />
      <DroneMap drones={drones} onMapReady={() => setMapReady(true)} />
      <Counter drones={drones} />
    </div>
  );
}

export default App;
