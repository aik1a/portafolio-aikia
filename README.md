# Portafolio Aikia + Estudio Abierto (Versión final acotada y estable)

Este repositorio contiene el portafolio profesional de Aikia Riveros integrado con el módulo conversacional **Estudio Abierto**. Esta versión ha sido adaptada y acotada para garantizar la estabilidad de los flujos de comunicación en tiempo real requeridos por la pauta docente.

---

## Alcance final de esta versión

Esta entrega prioriza y tiene completamente operativos los siguientes puntos:
* **Comunicación en tiempo real:** Comunicación bidireccional mediante WebSockets con Socket.IO.
* **Autenticación básica (Alias):** Ingreso obligatorio de alias sanitizado de 2 a 30 caracteres.
* **Salas temáticas:** 6 salas estáticas de conversación (`proyectos`, `producto-ux`, `ia-aplicada`, `colaboraciones`, `comisiones-web`, `trayectoria`) validadas en frontend y backend.
* **Mensajes e Emojis:** Envío de mensajes (máximo 500 caracteres) y selector integrado de emojis rápidos.
* **Notificaciones visuales:** Badge visual en el launcher flotante del portafolio cuando llegan nuevos mensajes ajenos en salas inactivas o con el panel cerrado.
* **Notificaciones sonoras:** Sonido corto al recibir mensajes ajenos, configurable mediante un botón silenciador (Mute) persistente en `localStorage`.
* **Historial básico:** Historial persistido en `localStorage` (cliente) y mediante escritura asíncrona en archivo JSON local (servidor).
* **Manejo de errores:** Detección de desconexión del servidor en tiempo real y botón de reintento.
* **Estabilidad y compatibilidad:** El portafolio principal, la maqueta y el formulario de contacto con Formspree se mantienen 100% operativos.

---

## Fuera de alcance de esta versión

Por diseño, estabilidad y enfoque en los requisitos principales, se excluyen de la interfaz y del flujo oficial las siguientes características:
* **Búsqueda en historial:** No habilitada en esta versión de entrega.
* **Archivos adjuntos desde la interfaz:** Desactivados en la UI para evitar problemas de almacenamiento o de ejecución de archivos maliciosos.
* **Scroll infinito / Carga retrospectiva:** La sala carga la lista inicial de mensajes en memoria y locales.
* **Endpoint paginado de historial:** Se omite su consulta por desuso en el flujo de scroll.
* **Uploads de archivos en chat:** Deshabilitado del flujo de usuario final.

---

## Ejecución Local

1. Instala dependencias en la raíz:
   ```bash
   npm install
   ```

2. Levanta el backend de chat en una terminal:
   ```bash
   npm run dev:server
   ```

3. Levanta el frontend en otra terminal:
   ```bash
   npm run dev
   ```

El frontend usa `http://localhost:5173` con puerto estricto (`--strictPort`). Si el puerto está ocupado, libéralo antes de ejecutar.

---

## Variables de Entorno

Copia `.env.example` a `.env.local` en el entorno de desarrollo y configura los valores correspondientes. **No entregues `.env.local`.**

```env
VITE_CHAT_SERVER_URL=http://localhost:3001
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
VITE_FORMSPREE_STUDIO_ENDPOINT=https://formspree.io/f/tu_form_id
```

---

## Verificación Rápida

* **Frontend:** `http://localhost:5173/`
* **Backend Healthcheck:** `http://localhost:3001/api/health`
* **Chat realtime:** Abrir dos pestañas con alias distintos en la misma sala y enviar mensajes.
* **DevTools:** `Network > WS > /socket.io/` debe mostrar status `101 Switching Protocols`.

---

## Integridad

Ejecuta los siguientes comandos para confirmar la consistencia del proyecto:
```bash
npm run test      # Pruebas unitarias
npm run lint      # Linter de código
npm run build     # Compilación de producción
git diff --check  # Verificación de espacios en blanco
```

> [!NOTE]
> `git diff --check` no reportó errores de whitespace. Git puede mostrar advertencias informativas de conversión de saltos de línea controladas mediante `.gitattributes`.
