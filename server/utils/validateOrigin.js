const LOCAL_DEV_ORIGINS = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

export function getAllowedOrigins(clientOrigin) {
  return new Set([clientOrigin, ...LOCAL_DEV_ORIGINS].filter(Boolean));
}

export function createOriginValidator(clientOrigin) {
  const allowedOrigins = getAllowedOrigins(clientOrigin);

  return function validateOrigin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origen no permitido por CORS.'));
  };
}
