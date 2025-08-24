import { useState, useCallback } from 'react';
import useWebSocket from './hooks/useWebSocket';
import DroneMap from './components/DroneMap';

function App() {
  const [drones, setDrones] = useState({});

  const handleNewDroneData = useCallback((data) => {
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

  return (
    <div className="h-screen w-full">
      <DroneMap drones={drones} />
    </div>
  );
}

export default App;
