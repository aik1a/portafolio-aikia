export function validateName(name) {
  return name.trim().length >= 2;
}

export function validateMessage(message) {
  return message.trim().length >= 10;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateAttachment(file) {
  if (!file) return { ok: true };

  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'text/plain'];
  const maxBytes = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return { ok: false, reason: 'type' };
  }

  if (file.size > maxBytes) {
    return { ok: false, reason: 'size' };
  }

  return { ok: true };
}
