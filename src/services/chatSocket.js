import { io } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_CHAT_SERVER_URL || 'http://localhost:3001';

let socket;

export function getChatSocket() {
  if (!socket) {
    socket = io(SERVER_URL, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });
  }

  return socket;
}

export function connectChatSocket() {
  const activeSocket = getChatSocket();
  if (!activeSocket.connected) {
    activeSocket.connect();
  }
  return activeSocket;
}

export function joinRoom(payload) {
  getChatSocket().emit('joinRoom', payload);
}

export function leaveRoom(payload) {
  getChatSocket().emit('leaveRoom', payload);
}

export function sendMessage(payload) {
  getChatSocket().emit('sendMessage', payload);
}
