import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import { getRoomMessages, registerChatSocket } from './socket.js';
import uploadsRouter from './routes/uploads.routes.js';
import { validateRoom } from './utils/validateRoom.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
const server = createServer(app);

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'data', 'uploads')));
app.use('/api/uploads', uploadsRouter);

app.get('/api/messages/:room', async (req, res) => {
  const { room } = req.params;
  if (!validateRoom(room)) {
    res.status(400).json({ error: 'Sala no valida.' });
    return;
  }

  try {
    const limit = Number(req.query.limit || 20);
    const messages = await getRoomMessages(room, {
      limit,
      before: req.query.before,
    });
    res.json({ room, messages: messages.messages, hasMore: messages.hasMore });
  } catch {
    res.status(500).json({ error: 'No se pudo cargar el historial.' });
  }
});

registerChatSocket(server, CLIENT_ORIGIN);

server.listen(PORT, () => {
  console.info(`StudioOpen chat server listening on http://localhost:${PORT}`);
});
