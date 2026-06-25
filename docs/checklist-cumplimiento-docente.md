# Checklist De Cumplimiento Docente (Versión final acotada y estable)

Este checklist detalla los criterios de cumplimiento técnico y manual del portafolio **Aikia + Estudio Abierto** para su entrega docente.

---

## Estado de Cumplimiento

| Estado | Ítem | Evidencia / Notas |
|---|---|---|
| **Cumple** | Portafolio React/Vite funcional | Compila de forma limpia en local con `npm run build` |
| **Cumple** | Lint sin errores | Pasa linter de forma limpia en local con `npm run lint` |
| **Cumple** | Chat integrado en `StudioOpen` | Vive dentro del widget flotante existente en [StudioOpen.jsx](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/src/components/StudioOpen/StudioOpen.jsx) |
| **Cumple** | Sin ruta ni widget paralelo | No se crearon rutas `/chat` ni launchers alternativos |
| **Cumple técnico** | Socket.IO cliente/servidor | Implementado con la librería `socket.io` y `socket.io-client` |
| **Cumple** | Ejecución local en puerto fijo | Puerto estricto `5173` para frontend y `3001` para backend |
| **Cumple** | Healthcheck backend | Endpoint operativo en `GET /api/health` |
| **Cumple técnico** | CORS local controlado | Middleware CORS restringe orígenes locales estrictos en puerto `5173` |
| **Cumple** | Salas temáticas | 6 salas estáticas definidas y validadas en frontend y backend |
| **Cumple** | Alias obligatorio | Validación sanitizada (2 a 30 caracteres) en frontend y backend |
| **Cumple técnico** | Envío de mensajes | Transmisión de mensajes mediante eventos websockets bidireccionales |
| **Cumple** | Emojis | Selector visual y funcional en el input del chat |
| **Fuera de alcance de esta versión** | Compartición de archivos | Desactivado en la interfaz para resguardar la seguridad y estabilidad |
| **Pendiente evidencia manual** | Notificaciones visuales | Badge visual en el launcher al recibir mensajes externos |
| **Pendiente evidencia manual** | Notificaciones sonoras | Reproducción de sonido y control Mute persistente |
| **Cumple técnico** | Historial cliente | Persistencia de mensajes locales en `localStorage` por sala |
| **Cumple técnico** | Historial backend JSON | Escritura asíncrona serializada de mensajes en `server/data/messages.json` |
| **Fuera de alcance de esta versión** | Búsqueda por sala | Desactivada en la interfaz en esta versión |
| **Fuera de alcance de esta versión** | Scroll infinito retrospectivo | No habilitado para el usuario final en esta entrega |
| **Cumple** | Documentación técnica | Disponible en [docs/estudio-abierto.md](file:///c:/Users/howle/Desktop/ProyectosWeb/Portafolio-Aikia/portafolio-aikia-main/docs/estudio-abierto.md) |
| **Pendiente evidencia manual** | Evidencia gráfica / QA | Pruebas de captura de pantalla y flujo en navegadores |
| **Pendiente evidencia manual** | QA manual dos pestañas | Pruebas de envío y recepción entre alias diferentes simultáneos |
| **Pendiente evidencia manual** | Formspree intacto | El formulario de contacto de orientación sigue operando con Formspree |

---

## Comandos De Integridad Ejecutados

```bash
npm run lint      # Lint pasa sin errores
npm run build     # Build pasa sin errores
npm run test      # 7/7 tests pasan sin errores
git diff --check  # Verificación de espacios en blanco pasa sin errores
```

> [!NOTE]
> `git diff --check` no reportó errores de whitespace. Git puede mostrar advertencias informativas de conversión de saltos de línea controladas mediante `.gitattributes`.

---

## Criterio de Cierre Técnico

El proyecto se encuentra en una **versión final acotada y estable**. Pasa todos los controles técnicos automatizados (lint, tests, build, whitespace) y se considera listo para iniciar la fase de pruebas manuales y generación de evidencias visuales.
