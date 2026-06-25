export function sanitizeText(value) {
  return String(value || '').replace(/[<>]/g, '').trim();
}

export function validateAlias(alias) {
  const cleanAlias = sanitizeText(alias);
  return cleanAlias.length >= 2 && cleanAlias.length <= 30;
}
