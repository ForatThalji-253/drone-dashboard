import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:9013'; // عدل البورت لو مختلف

export default function useWebSocket(onNewDroneData) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      console.log('🔌 Connected to WebSocket server');
    });

    socketRef.current.on('message', (data) => {
      // تأكد من اسم الحدث حسب الباكند
      console.log('📡 New drone data:', data);
      onNewDroneData(data); // نمرر البيانات للـ parent
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [onNewDroneData]);
}
