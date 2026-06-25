const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = new Map([
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.txt', 'text/plain'],
]);

const BLOCKED_EXTENSIONS = new Set(['.exe', '.js', '.html', '.php', '.sh', '.zip', '.bat', '.cmd']);

export function getFileExtension(fileName = '') {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : '';
}

export function validateFileMetadata(file) {
  const extension = getFileExtension(file?.originalname);
  if (BLOCKED_EXTENSIONS.has(extension) || !ALLOWED_TYPES.has(extension)) {
    return { ok: false, error: 'Tipo de archivo no permitido.' };
  }

  const expectedMime = ALLOWED_TYPES.get(extension);
  if (file?.mimetype !== expectedMime) {
    return { ok: false, error: 'El tipo MIME no coincide con la extension.' };
  }

  return { ok: true };
}

export function validateFile(file) {
  if (!file) {
    return { ok: false, error: 'Selecciona un archivo.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: 'El archivo supera el maximo de 5 MB.' };
  }

  return validateFileMetadata(file);
}
