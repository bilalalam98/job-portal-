// src/lib/socket.ts
import { io } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
const socket = io(`${API_URL}/jobs`, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

export default socket;
