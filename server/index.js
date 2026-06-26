import { createServer } from 'node:http';
import cors from 'cors';
import express from 'express';
import { registerChatSocket } from './socket.js';
import { createOriginValidator } from './utils/validateOrigin.js';

const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
const server = createServer(app);
const validateOrigin = createOriginValidator(CLIENT_ORIGIN);

app.use(cors({ origin: validateOrigin }));
app.use(express.json());


const chatSocket = registerChatSocket(server, validateOrigin);

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'estudio-abierto-chat',
    socket: Boolean(chatSocket),
    port: Number(PORT),
    clientOrigin: CLIENT_ORIGIN,
    timestamp: new Date().toISOString(),
  });
});



server.listen(PORT, () => {
  console.info(`StudioOpen chat server listening on http://localhost:${PORT}`);
});
