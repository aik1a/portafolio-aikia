import { sanitizeText, validateAlias } from './validateAlias.js';

export function validateMessage(message) {
  const cleanText = sanitizeText(message?.text);

  return (
    validateAlias(message?.user) &&
    cleanText.length > 0 &&
    cleanText.length <= 500
  );
}
