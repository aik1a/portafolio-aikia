# Configuracion de email con Formspree

Esta implementacion resuelve el envio desde React usando `fetch`, `FormData` y variables de entorno de Vite. La entrega del correo, destinatarios y autorespuesta dependen de la configuracion en Formspree.

## 1. Crear formulario en Formspree

Crea un formulario para Estudio Abierto en Formspree y copia su endpoint.

El endpoint debe tener este formato:

```env
VITE_FORMSPREE_STUDIO_ENDPOINT=https://formspree.io/f/xxxxxxx
```

## 2. Configurar correo de destino

Configura como destinatario el correo profesional de Aikia desde el panel de Formspree.

## 3. Copia o autorespuesta al usuario

No dupliques requests desde React para enviar copia al usuario.

La copia debe configurarse desde Formspree usando el campo `email` como destinatario de autorespuesta. El codigo envia tambien `_replyto` con el mismo correo para facilitar la respuesta manual.

## 4. Variables de entorno

En local, crea `.env.local` con:

```env
VITE_FORMSPREE_STUDIO_ENDPOINT=https://formspree.io/f/xxxxxxx
```

En el hosting, configura la variable:

```txt
VITE_FORMSPREE_STUDIO_ENDPOINT
```

Si agregas o cambias variables en `.env.local`, reinicia `npm run dev`. Vite no recarga variables nuevas sin reiniciar el servidor.

## 5. Pruebas manuales

- Enviar consulta sin archivo.
- Enviar consulta con archivo PDF.
- Enviar consulta con imagen PNG/JPG.
- Probar email invalido.
- Probar mensaje demasiado corto.
- Probar endpoint ausente.
- Probar archivo no permitido.
- Probar archivo mayor a 5 MB si es viable.
- Confirmar llegada del correo a Aikia.
- Confirmar autorespuesta al usuario si esta configurada en Formspree.

## Responsabilidades

El codigo prepara y envia los datos del formulario. Formspree se encarga de entregar el correo, aplicar reglas del formulario y enviar autorespuestas configuradas desde su panel.
