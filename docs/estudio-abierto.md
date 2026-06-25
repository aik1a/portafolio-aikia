# Estudio Abierto — Documentación de Implementación Docente

Este documento describe la arquitectura, stack, ejecución y alcance de la **versión final acotada y estable** de **Estudio Abierto**, el módulo conversacional integrado al portafolio profesional de Aikia Riveros.

---

## Propósito

El objetivo principal es cumplir el encargo docente de integrar comunicación en tiempo real mediante WebSockets (`Socket.IO`) dentro de un sitio web existente, manteniendo el portafolio, su maqueta, adaptabilidad responsive y el flujo de contacto de Formspree sin alteraciones.

---

## Alcance final de esta versión

Esta entrega prioriza y tiene operativos:
* **Comunicación bidireccional en tiempo real:** Mensajes enviados por un cliente aparecen de forma inmediata en otros clientes conectados a la misma sala mediante WebSockets.
* **Salas temáticas independientes:** El usuario cambia entre 6 salas definidas (`proyectos`, `producto-ux`, `ia-aplicada`, `colaboraciones`, `comisiones-web`, `trayectoria`) sin mezcla de mensajes.
* **Identificación (Alias):** Campo de alias obligatorio (de 2 a 30 caracteres) y sanitizado.
* **Mensajes y emojis:** Mensajes de texto de hasta 500 caracteres con selector de emojis.
* **Historial básico:** Los mensajes se almacenan en memoria y localmente (`localStorage`), y se escriben asíncronamente en el servidor en el archivo JSON local.
* **Notificaciones visuales y sonoras:** Badge de alertas visuales en el launcher de Estudio Abierto y sonido de alerta (configurable con botón Mute persistente).
* **Manejo de errores:** Detección automática de desconexión del servidor y botón de reintento de conexión.
* **Integridad del portafolio:** Todo el sitio base (Header, Hero, Sobre Mí, Habilidades, Proyectos, Formación, Footer) y el formulario con Formspree siguen plenamente operativos.

---

## Fuera de alcance de esta versión

Por criterios de estabilidad y acotación de la entrega, quedan **fuera de alcance en el flujo de usuario final**:
* **Búsqueda en historial:** Desactivada en la interfaz en esta versión.
* **Archivos adjuntos desde la interfaz:** Inhabilitada su carga y renderizado de tarjetas en burbujas para resguardar la seguridad del almacenamiento local.
* **Scroll infinito / Paginación retrospectiva:** La sala mantiene y visualiza el historial básico inicial.
* **Endpoint paginado de historial:** No consultado por el cliente en esta versión.
* **Gestión de uploads en chat:** Deshabilitado del flujo de usuario final.

---

## Stack Utilizado

* **Frontend:** React, Vite, JavaScript, Tailwind CSS existente y estilos CSS específicos de `StudioOpen`.
* **Realtime:** `socket.io-client` para la comunicación por WebSockets.
* **Backend:** Node.js, Express, Socket.IO.
* **Persistencia:** `localStorage` (cliente) y JSON local (servidor).
* **Contacto:** Formspree.

---

## Ejecución Local

1. Instalar dependencias en la raíz:
   ```bash
   npm install
   ```

2. Ejecutar el backend del chat:
   ```bash
   npm run dev:server
   ```
   *Disponible en:* `http://localhost:3001`

3. Ejecutar el frontend del portafolio:
   ```bash
   npm run dev
   ```
   *Disponible en:* `http://localhost:5173` (usa puerto estricto `--strictPort`).

### Healthcheck del Servidor
El servidor expone el endpoint `GET /api/health` para comprobar el estado de conexión del servicio:
```json
{
  "ok": true,
  "service": "estudio-abierto-chat",
  "socket": true,
  "port": 3001,
  "clientOrigin": "http://localhost:5173",
  "timestamp": "2026-06-25T19:30:00.000Z"
}
```

---

## Arquitectura

* **[StudioOpen.jsx](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/src/components/StudioOpen/StudioOpen.jsx):** Único panel flotante donde reside el chat (evita duplicar el launcher). Monta el controlador de chat de forma persistente.
* **[useStudioChatController.js](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/src/hooks/useStudioChatController.js):** Hook que centraliza las conexiones del socket, actualización de estados, sonido y guardado de historial local.
* **[chatSocket.js](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/src/services/chatSocket.js):** Conexión Socket.IO con el servidor.
* **[chatLocalHistory.js](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/src/services/chatLocalHistory.js):** Lógica de acceso a `localStorage` y combinación cronológica sin duplicación de IDs de mensajes.
* **[server/index.js](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/server/index.js):** Servidor HTTP con Express, políticas CORS locales estrictas, endpoint de healthcheck y static path de uploads.
* **[server/socket.js](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/server/socket.js):** Manejo de salas de chat por socket, sanitización del contenido recibido y escritura concurrente segura a `messages.json` usando cola de tareas.

---

## Validaciones y Seguridad

* **Alias:** Sanitizado de caracteres `<>` y limitado a un rango de 2 a 30 caracteres.
* **Mensajes:** Máximo de 500 caracteres, sanitizados antes de transmitirse.
* **Salas:** Solo se permiten las 6 salas definidas en el archivo de configuración. Cualquier sala inválida es rechazada de inmediato tanto en cliente como en servidor.
* **Seguridad de origen (CORS):** Control de origen CORS mediante validador dinámico para `http://localhost:5173` y `http://127.0.0.1:5173`.

---

## Pruebas de Integridad Realizadas

Se ejecutan en la terminal para certificar la consistencia técnica de la entrega:
* **`npm run test`:** 7/7 pruebas unitarias aprobadas de forma limpia (validación frontend/backend de inputs, salas, merge de historial y paginación retrospectiva).
* **`npm run lint`:** Linter finalizado sin advertencias ni errores.
* **`npm run build`:** Compilación de Vite exitosa para producción.
* **`git diff --check`:**
  > [!NOTE]
  > `git diff --check` no reportó errores de whitespace. Git puede mostrar advertencias informativas de conversión de saltos de línea controladas mediante `.gitattributes`.
