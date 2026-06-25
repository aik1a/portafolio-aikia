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

export async function fetchOlderMessages(roomId, before, limit = 20) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (before) params.set('before', before);

  const response = await fetch(`${SERVER_URL}/api/messages/${roomId}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('No se pudo cargar el historial.');
  }

  return response.json();
}

export async function uploadChatFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${SERVER_URL}/api/uploads`, {
    method: 'POST',
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'No se pudo subir el archivo.');
  }

  return {
    ...payload.attachment,
    url: `${SERVER_URL}${payload.attachment.url}`,
  };
}
