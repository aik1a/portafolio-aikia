import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { Server } from 'socket.io';
import { sanitizeText, validateAlias } from './utils/validateAlias.js';
import { validateMessage } from './utils/validateMessage.js';
import { paginateMessages } from './utils/paginateMessages.js';
import { CHAT_ROOM_IDS, validateRoom } from './utils/validateRoom.js';

const DATA_PATH = new URL('./data/messages.json', import.meta.url);
const HISTORY_LIMIT = 20;
let writeQueue = Promise.resolve();

async function readMessages() {
  try {
    const content = await readFile(DATA_PATH, 'utf8');
    const parsed = JSON.parse(content);
    return CHAT_ROOM_IDS.reduce((acc, roomId) => {
      acc[roomId] = Array.isArray(parsed[roomId]) ? parsed[roomId] : [];
      return acc;
    }, {});
  } catch {
    return CHAT_ROOM_IDS.reduce((acc, roomId) => {
      acc[roomId] = [];
      return acc;
    }, {});
  }
}

async function writeMessages(messages) {
  await writeFile(DATA_PATH, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
}

export async function getRoomMessages(roomId, { limit = HISTORY_LIMIT, before } = {}) {
  if (!validateRoom(roomId)) {
    throw new Error('Sala no valida.');
  }

  const messages = await readMessages();
  return paginateMessages(messages[roomId], { limit, before });
}

async function appendMessage(message) {
  const nextWrite = writeQueue.then(async () => {
    const messages = await readMessages();
    const nextMessage = {
      id: message.id || `msg-${randomUUID()}`,
      room: message.room,
      user: sanitizeText(message.user),
      text: sanitizeText(message.text),
      createdAt: message.createdAt || new Date().toISOString(),
      attachment: message.attachment || null,
    };

    messages[nextMessage.room] = [...messages[nextMessage.room], nextMessage];
    await writeMessages(messages);
    return nextMessage;
  });

  writeQueue = nextWrite.catch(() => {});
  return nextWrite;
}

function createSystemMessage(room, text) {
  return {
    id: `sys-${randomUUID()}`,
    room,
    user: 'system',
    text,
    createdAt: new Date().toISOString(),
    attachment: null,
  };
}

export function registerChatSocket(server, corsOrigin) {
  const io = new Server(server, {
    cors: {
      origin: corsOrigin,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('joinRoom', async ({ room, alias } = {}) => {
      if (!validateRoom(room) || !validateAlias(alias)) {
        socket.emit('errorMessage', { message: 'Alias o sala no valida.' });
        return;
      }

      socket.join(room);
      socket.data.alias = sanitizeText(alias);
      socket.data.room = room;
      socket.emit('roomHistory', {
        room,
        messages: (await getRoomMessages(room)).messages,
      });
      socket.to(room).emit('systemMessage', createSystemMessage(room, `${socket.data.alias} se unio a la sala.`));
    });

    socket.on('leaveRoom', ({ room, alias } = {}) => {
      if (!validateRoom(room)) return;
      socket.leave(room);
      if (validateAlias(alias)) {
        socket.to(room).emit('systemMessage', createSystemMessage(room, `${sanitizeText(alias)} salio de la sala.`));
      }
    });

    socket.on('sendMessage', async (message = {}) => {
      if (!validateRoom(message.room) || !validateMessage(message)) {
        socket.emit('errorMessage', { message: 'Mensaje no valido.' });
        return;
      }

      try {
        const savedMessage = await appendMessage(message);
        io.to(savedMessage.room).emit('newMessage', savedMessage);
      } catch {
        socket.emit('errorMessage', { message: 'No se pudo guardar el mensaje.' });
      }
    });
  });

  return io;
}
