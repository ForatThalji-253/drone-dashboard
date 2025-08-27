import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL =  new WebSocket("wss://drone-map-backend-1.onrender.com");


export default function useWebSocket(onNewDroneData) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      console.log('🔌 Connected to WebSocket server');
    });

    socketRef.current.on('message', (data) => {
      
      console.log('📡 New drone data:', data);
      onNewDroneData(data);     
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [onNewDroneData]);
}
