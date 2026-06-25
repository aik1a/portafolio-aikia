import { CHAT_ROOMS } from '../data/chatRooms.js';

const MAX_ALIAS_LENGTH = 30;
const MIN_ALIAS_LENGTH = 2;
const MAX_MESSAGE_LENGTH = 500;

export function sanitizeChatText(value) {
  return String(value || '').replace(/[<>]/g, '').trim();
}

export function validateChatAlias(alias) {
  const cleanAlias = sanitizeChatText(alias);
  return cleanAlias.length >= MIN_ALIAS_LENGTH && cleanAlias.length <= MAX_ALIAS_LENGTH;
}

export function validateChatMessage(text) {
  const cleanText = sanitizeChatText(text);
  return cleanText.length > 0 && cleanText.length <= MAX_MESSAGE_LENGTH;
}

export function validateChatRoom(roomId) {
  return CHAT_ROOMS.some((room) => room.id === roomId);
}

export function createChatMessageId(prefix = 'msg') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
