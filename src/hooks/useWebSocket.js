import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useWebSocket(onNewDroneData) {
  const socketRef = useRef(null);

  useEffect(() => {
   
    socketRef.current = io("https://drone-map-backend-2.onrender.com");

    socketRef.current.on('connect', () => {
      console.log('🔌 Connected to Socket.IO server');
    });

    socketRef.current.on('message', (data) => {
      console.log('📡 New drone data:', data);
      onNewDroneData(data);
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [onNewDroneData]);
}
