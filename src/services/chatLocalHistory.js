const ALIAS_KEY = 'studio-open:chat-alias';
const SOUND_KEY = 'studio-open:chat-sound-muted';
const HISTORY_PREFIX = 'studio-open:chat-history:';

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function readJson(key, fallback) {
  if (!canUseStorage()) return fallback;

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function writeJson(key, value) {
  if (!canUseStorage()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or disabled; chat should continue in memory.
  }
}

function roomKey(roomId) {
  return `${HISTORY_PREFIX}${roomId}`;
}

export function getChatAlias() {
  if (!canUseStorage()) return '';
  return window.localStorage.getItem(ALIAS_KEY) || '';
}

export function saveChatAlias(alias) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ALIAS_KEY, alias);
}

export function clearChatAlias() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(ALIAS_KEY);
}

export function getRoomHistory(roomId) {
  const messages = readJson(roomKey(roomId), []);
  return Array.isArray(messages) ? messages : [];
}

export function saveRoomHistory(roomId, messages) {
  writeJson(roomKey(roomId), mergeRoomMessages([], messages));
}

export function appendRoomMessage(roomId, message) {
  const nextMessages = mergeRoomMessages(getRoomHistory(roomId), [message]);
  saveRoomHistory(roomId, nextMessages);
  return nextMessages;
}

export function mergeRoomMessages(existingMessages = [], incomingMessages = []) {
  const byId = new Map();

  [...existingMessages, ...incomingMessages].forEach((message) => {
    if (message?.id) {
      byId.set(message.id, message);
    }
  });

  return Array.from(byId.values()).sort((a, b) => {
    const left = new Date(a.createdAt || 0).getTime();
    const right = new Date(b.createdAt || 0).getTime();
    return left - right;
  });
}

export function getSoundMutedPreference() {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(SOUND_KEY) === 'true';
}

export function saveSoundMutedPreference(isMuted) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SOUND_KEY, String(Boolean(isMuted)));
}
