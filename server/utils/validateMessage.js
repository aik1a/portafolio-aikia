import { sanitizeText, validateAlias } from './validateAlias.js';

export function validateMessage(message) {
  const cleanText = sanitizeText(message?.text);
  const hasAttachment = Boolean(message?.attachment);

  return (
    validateAlias(message?.user) &&
    (cleanText.length > 0 || hasAttachment) &&
    cleanText.length <= 500
  );
}
