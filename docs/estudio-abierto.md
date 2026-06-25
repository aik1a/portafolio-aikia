# Estudio Abierto

## Proposito

Estudio Abierto es el modulo conversacional integrado al portafolio Aikia. No es una ruta nueva ni una app aislada: vive dentro del widget `StudioOpen` y mantiene el portafolio, su flujo de contacto con Formspree y su maqueta base.

El objetivo docente es demostrar comunicacion en tiempo real con Socket.IO entre dos pestanas o clientes, junto con salas, alias, historial, busqueda, emojis, archivos, notificaciones y documentacion tecnica.

## Stack Utilizado

- Frontend: React, Vite, JavaScript, Tailwind CSS existente y CSS propio de `StudioOpen`.
- Realtime: `socket.io-client`.
- Backend: Node.js, Express, Socket.IO, CORS, Multer.
- Persistencia: `localStorage` para cliente y JSON local para backend.
- Contacto existente: Formspree.

## Ejecucion Local

```bash
npm install
npm run dev:server
npm run dev
```

Variables opcionales:

- `PORT`: puerto backend, por defecto `3001`.
- `CLIENT_ORIGIN`: origen permitido por CORS, por defecto `http://localhost:5173`.
- `VITE_CHAT_SERVER_URL`: URL del backend, por defecto `http://localhost:3001`.
- `VITE_FORMSPREE_STUDIO_ENDPOINT`: endpoint Formspree del flujo de contacto.

## Arquitectura

Frontend:

- `src/components/StudioOpen/StudioOpen.jsx`: contenedor principal del widget, monta el controlador persistente del chat y mantiene Formspree.
- `src/hooks/useStudioChatController.js`: conexion Socket.IO, mensajes, salas, historial local, notificaciones, sonido, scroll y uploads.
- `src/components/StudioOpen/Chat/`: vista del chat, alias, salas, busqueda, lista, input, sonido y burbujas.
- `src/services/chatLocalHistory.js`: alias, historial local, merge sin duplicados y preferencia de sonido.
- `src/services/chatSocket.js`: Socket.IO, historial HTTP paginado y upload.
- `src/utils/chatValidation.js` y `src/utils/chatFileValidation.js`: validaciones frontend.

Backend:

- `server/index.js`: Express, CORS, rutas HTTP y montaje Socket.IO.
- `server/socket.js`: eventos realtime y cola de escritura JSON.
- `server/routes/uploads.routes.js`: subida validada de archivos.
- `server/utils/`: validadores y paginacion.
- `server/data/messages.json`: historial por sala.
- `server/data/uploads/`: archivos subidos.

## Flujo De Usuario

1. Usuario abre el portafolio.
2. Usuario abre Estudio Abierto.
3. Entra al chat e ingresa alias obligatorio.
4. Selecciona sala tematica.
5. Envia mensajes, emojis o archivos.
6. Puede buscar en la sala actual y cargar historial anterior al hacer scroll hacia arriba.
7. Si recibe mensajes ajenos, ve notificaciones visuales y puede controlar sonido.

## Eventos Socket.IO

- `joinRoom`: usuario entra a sala.
- `leaveRoom`: usuario sale de sala.
- `sendMessage`: usuario envia mensaje.
- `roomHistory`: servidor entrega historial inicial.
- `newMessage`: servidor emite mensaje nuevo.
- `systemMessage`: aviso de entrada/salida.
- `errorMessage`: error validado.
- `connect` y `disconnect`: estado de conexion.

Formato de mensaje:

```js
{
  id: 'msg-id',
  room: 'proyectos',
  user: 'Alias',
  text: 'Mensaje',
  createdAt: '2026-06-25T00:00:00.000Z',
  attachment: null
}
```

## Validaciones

- Alias obligatorio, entre 2 y 30 caracteres.
- Mensaje maximo 500 caracteres, no solo espacios salvo que incluya adjunto.
- Salas restringidas a `src/data/chatRooms.js` y validadas tambien en backend.
- Mensajes renderizados como texto plano; no se usa `innerHTML`.
- Archivos permitidos: PDF, PNG, JPG, JPEG, TXT.
- Maximo de archivo: 5 MB.
- Bloqueados: EXE, JS, HTML, PHP, SH, ZIP, BAT, CMD.
- Backend valida extension, MIME y tamano antes de aceptar el archivo.

## Pruebas Ejecutables

```bash
npm run lint
npm run build
npm run test
git diff --check
```

Pruebas automatizadas incluidas:

- Validacion frontend de alias, mensajes, salas y archivos.
- Validacion backend de alias, mensajes, salas y archivos.
- Merge de historial local sin duplicados.
- Paginacion de historial con menos de 20, exactamente 20 y mas de 20 mensajes.

## QA Manual Docente

Checklist manual para la entrega:

- [ ] Abrir portafolio y confirmar carga completa.
- [ ] Abrir/cerrar Estudio Abierto sin romper layout.
- [ ] Probar alias invalido y alias valido.
- [ ] Abrir dos pestanas con alias distintos.
- [ ] Enviar mensaje desde pestana A y verlo en pestana B sin recargar.
- [ ] Cambiar salas y confirmar que no se mezclan mensajes.
- [ ] Recargar y confirmar alias/historial.
- [ ] Buscar texto existente e inexistente.
- [ ] Enviar emoji y confirmar persistencia.
- [ ] Subir PDF/PNG/JPG/TXT permitido.
- [ ] Bloquear EXE/JS/HTML/PHP/SH/ZIP/BAT/CMD.
- [ ] Ver badge/indicador de notificacion con mensaje ajeno.
- [ ] Activar/desactivar sonido y confirmar que mensaje propio no suena.
- [ ] Probar mobile, tablet y desktop.
- [ ] Confirmar que Formspree sigue funcionando.

Evidencia grafica pendiente si se requiere en la entrega: capturas desktop/mobile, dos pestanas, busqueda, archivo, scroll, badge y terminales frontend/backend.

## Decisiones Tecnicas

- Se mantiene `StudioOpen` como unico widget; no hay ruta nueva ni segundo launcher.
- La conexion Socket.IO queda en un controlador montado desde `StudioOpen`, por lo que puede recibir mensajes aunque la pantalla de chat no este visible.
- La escritura en JSON se serializa para reducir riesgo de perdida ante envios simultaneos.
- El scroll infinito usa paginacion exacta con `hasMore`.
- Los estilos nuevos se limitan a clases `.studio-open__chat-*` al final de `StudioOpen.css`.
