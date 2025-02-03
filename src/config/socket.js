import { io } from 'socket.io-client';

export const socket = io('http://localhost:8000', {
  reconnectionDelayMax: 10000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ['websocket', 'polling']
});
