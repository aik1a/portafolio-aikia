import { useEffect, useMemo, useRef, useState } from 'react';
import { CHAT_ROOMS } from '../data/chatRooms';
import {
  appendRoomMessage,
  getChatAlias,
  getRoomHistory,
  getSoundMutedPreference,
  mergeRoomMessages,
  saveChatAlias,
  saveRoomHistory,
  saveSoundMutedPreference,
} from '../services/chatLocalHistory';
import {
  connectChatSocket,
  getChatSocket,
  joinRoom,
  leaveRoom,
  sendMessage,
} from '../services/chatSocket';
import {
  createChatMessageId,
  sanitizeChatText,
  validateChatMessage,
} from '../utils/chatValidation';

function readInitialMessages() {
  return CHAT_ROOMS.flatMap((room) => getRoomHistory(room.id));
}

function playMessageSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 720;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.18);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
}

export function useStudioChatController({ isPanelOpen, onNotification }) {
  const [alias, setAlias] = useState(() => getChatAlias());
  const [activeRoomId, setActiveRoomId] = useState('proyectos');
  const [messages, setMessages] = useState(readInitialMessages);
  const [isMuted, setIsMuted] = useState(() => getSoundMutedPreference());
  const [socketError, setSocketError] = useState('');
  const [unreadRooms, setUnreadRooms] = useState({});
  const activeRoomRef = useRef(activeRoomId);
  const aliasRef = useRef(alias);
  const isMutedRef = useRef(isMuted);
  const isPanelOpenRef = useRef(isPanelOpen);

  useEffect(() => {
    activeRoomRef.current = activeRoomId;
  }, [activeRoomId]);

  useEffect(() => {
    aliasRef.current = alias;
  }, [alias]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    saveSoundMutedPreference(isMuted);
  }, [isMuted]);

  useEffect(() => {
    isPanelOpenRef.current = isPanelOpen;
  }, [isPanelOpen]);

  useEffect(() => {
    CHAT_ROOMS.forEach((room) => {
      const roomMessages = messages.filter((message) => message.room === room.id);
      saveRoomHistory(room.id, roomMessages);
    });
  }, [messages]);

  useEffect(() => {
    if (!alias) return undefined;

    const socket = connectChatSocket();
    const handleConnect = () => {
      setSocketError('');
      joinRoom({ room: activeRoomRef.current, alias: aliasRef.current });
    };
    const handleDisconnect = () => {
      setSocketError('Servidor de chat desconectado. Puedes seguir viendo tu historial local.');
    };
    const handleConnectError = () => {
      setSocketError('No se pudo conectar con el servidor de chat. Revisa que el backend este activo.');
    };
    const handleRoomHistory = ({ room, messages: incomingMessages }) => {
      setMessages((currentMessages) => mergeRoomMessages(currentMessages, incomingMessages));
      saveRoomHistory(room, incomingMessages);
    };
    const handleIncomingMessage = (message) => {
      setMessages((currentMessages) => mergeRoomMessages(currentMessages, [message]));
      appendRoomMessage(message.room, message);

      const isOwn = message.user === aliasRef.current;
      if (!isOwn) {
        if (message.room !== activeRoomRef.current) {
          setUnreadRooms((currentRooms) => ({ ...currentRooms, [message.room]: true }));
        }
        if (!isPanelOpenRef.current || message.room !== activeRoomRef.current) {
          onNotification?.(message.room);
        }
        if (!isMutedRef.current) {
          playMessageSound();
        }
      }
    };
    const handleErrorMessage = ({ message }) => {
      setSocketError(message || 'No se pudo completar la accion del chat.');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('roomHistory', handleRoomHistory);
    socket.on('newMessage', handleIncomingMessage);
    socket.on('systemMessage', handleIncomingMessage);
    socket.on('errorMessage', handleErrorMessage);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      leaveRoom({ room: activeRoomRef.current, alias: aliasRef.current });
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('roomHistory', handleRoomHistory);
      socket.off('newMessage', handleIncomingMessage);
      socket.off('systemMessage', handleIncomingMessage);
      socket.off('errorMessage', handleErrorMessage);
    };
  }, [alias, onNotification]);

  const handleSaveAlias = (nextAlias) => {
    saveChatAlias(nextAlias);
    setAlias(nextAlias);
  };

  const handleSendMessage = (text) => {
    const sanitizedText = sanitizeChatText(text);
    if (!validateChatMessage(sanitizedText)) return;

    const newMessage = {
      id: createChatMessageId(),
      room: activeRoomId,
      user: alias,
      text: sanitizedText,
      createdAt: new Date().toISOString(),
    };

    if (getChatSocket().connected) {
      sendMessage(newMessage);
    } else {
      setMessages((currentMessages) => mergeRoomMessages(currentMessages, [newMessage]));
      appendRoomMessage(activeRoomId, newMessage);
      setSocketError('Mensaje guardado localmente. Inicia el servidor para tiempo real.');
    }
  };

  const handleSelectRoom = (roomId) => {
    if (roomId === activeRoomId) return;
    leaveRoom({ room: activeRoomId, alias });
    setActiveRoomId(roomId);
    setUnreadRooms((currentRooms) => ({ ...currentRooms, [roomId]: false }));
    if (alias) {
      joinRoom({ room: roomId, alias });
    }
  };

  const handleRetryConnection = () => {
    if (!aliasRef.current) return;
    setSocketError('');
    const socket = connectChatSocket();
    if (socket.connected) {
      joinRoom({ room: activeRoomRef.current, alias: aliasRef.current });
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => message.room === activeRoomId);
  }, [activeRoomId, messages]);

  return {
    alias,
    activeRoomId,
    unreadRooms,
    isMuted,
    socketError,
    filteredMessages,
    onSaveAlias: handleSaveAlias,
    onSelectRoom: handleSelectRoom,
    onSendMessage: handleSendMessage,
    onToggleSound: () => setIsMuted((currentValue) => !currentValue),
    onRetryConnection: handleRetryConnection,
  };
}
