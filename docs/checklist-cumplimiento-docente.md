# Checklist De Cumplimiento Docente

Fuente prioritaria: `checklist-cumplimiento-docente-portafolio-estudio-abierto (1).md`.

## Estado General

| Estado | Item | Evidencia |
|---|---|---|
| Cumple | Portafolio React/Vite funcional | `npm run build` |
| Cumple | Lint sin errores | `npm run lint` |
| Cumple | Chat integrado en `StudioOpen` | `src/components/StudioOpen/StudioOpen.jsx` |
| Cumple | Sin ruta ni widget paralelo | No hay nueva ruta de chat ni segundo launcher |
| Cumple | Socket.IO cliente/servidor | `src/services/chatSocket.js`, `server/socket.js`, `package.json` |
| Cumple | Salas tematicas | `src/data/chatRooms.js`, `server/utils/validateRoom.js` |
| Cumple | Alias obligatorio | `ChatAliasForm`, `chatValidation.js` |
| Cumple | Envio de mensajes | Evento `sendMessage`, `newMessage` |
| Cumple | Emojis | Selector en `ChatMessageInput` |
| Cumple | Archivos | Multer + validacion frontend/backend |
| Cumple | Notificaciones visuales | Badge launcher e indicador por sala |
| Cumple | Notificaciones sonoras | Toggle persistente y Web Audio API |
| Cumple | Historial cliente | `chatLocalHistory.js` |
| Cumple | Historial backend JSON | `server/data/messages.json` |
| Cumple | Busqueda por sala | `ChatSearch` + controlador |
| Cumple | Scroll infinito | Endpoint paginado + `ChatMessageList` |
| Cumple | Documentacion tecnica | `docs/estudio-abierto.md` |
| Parcial | Evidencia grafica | Capturas pendientes si se solicitan |
| Parcial | QA manual dos pestanas | Flujo listo; requiere ejecucion manual final |

## Comandos De Integridad

```bash
npm run lint
npm run build
npm run test
git diff --check
```

## Pruebas Manuales Pendientes De Evidencia

- Captura portafolio completo.
- Captura Estudio Abierto cerrado y abierto.
- Captura alias y salas.
- Captura dos pestanas con comunicacion realtime.
- Captura emoji.
- Captura archivo permitido o bloqueo de archivo prohibido.
- Captura busqueda.
- Captura scroll infinito.
- Captura notificacion visual.
- Captura terminal backend y frontend.

## Criterio Interno De Cierre

El proyecto puede considerarse listo cuando los comandos de integridad pasan y la prueba manual de dos pestanas confirma que un mensaje enviado en una pestana llega a la otra sin recargar.
