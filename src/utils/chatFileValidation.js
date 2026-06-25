const MAX_CHAT_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_CHAT_FILE_TYPES = new Map([
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.txt', 'text/plain'],
]);

const BLOCKED_CHAT_FILE_EXTENSIONS = new Set(['.exe', '.js', '.html', '.php', '.sh', '.zip', '.bat', '.cmd']);

export function getChatFileExtension(fileName = '') {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : '';
}

export function validateChatFile(file) {
  if (!file) {
    return { ok: false, error: 'Selecciona un archivo.' };
  }

  const extension = getChatFileExtension(file.name);
  if (BLOCKED_CHAT_FILE_EXTENSIONS.has(extension) || !ALLOWED_CHAT_FILE_TYPES.has(extension)) {
    return { ok: false, error: 'Tipo de archivo no permitido.' };
  }

  if (file.size > MAX_CHAT_FILE_SIZE) {
    return { ok: false, error: 'El archivo supera el maximo de 5 MB.' };
  }

  const expectedMime = ALLOWED_CHAT_FILE_TYPES.get(extension);
  if (file.type && file.type !== expectedMime) {
    return { ok: false, error: 'El tipo MIME no coincide con la extension.' };
  }

  return { ok: true };
}
