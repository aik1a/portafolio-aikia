function sanitizeText(value) {
  return String(value || '').replace(/[<>]/g, '').trim();
}

function cleanSelectedOptions(selectedOptions = {}) {
  return Object.fromEntries(
    Object.entries(selectedOptions)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => [sanitizeText(key), sanitizeText(value)])
  );
}

function buildSelectedOptionsText(selectedOptions = {}) {
  return Object.entries(cleanSelectedOptions(selectedOptions))
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}

export async function sendStudioLead({ endpoint, lead, flow, selectedOptions }) {
  if (!endpoint) {
    throw new Error('Missing VITE_FORMSPREE_STUDIO_ENDPOINT');
  }

  const cleanName = sanitizeText(lead.name);
  const cleanEmail = sanitizeText(lead.email);
  const cleanMessage = sanitizeText(lead.message);
  const cleanFlow = sanitizeText(flow);
  const cleanOptions = cleanSelectedOptions(selectedOptions);
  const selectedOptionsText = buildSelectedOptionsText(cleanOptions);
  const createdAt = new Date().toISOString();
  const subjectName = cleanName || 'Sin nombre';
  const summary = [
    `Nombre: ${cleanName}`,
    `Email: ${cleanEmail}`,
    'Origen: Estudio Abierto',
    `Flujo: ${cleanFlow}`,
    '',
    'Opciones seleccionadas:',
    selectedOptionsText || 'Sin opciones seleccionadas',
    '',
    'Mensaje:',
    cleanMessage,
    '',
    'Fecha:',
    createdAt,
  ].join('\n');

  const formData = new FormData();

  formData.append('source', 'Estudio Abierto');
  formData.append('name', cleanName);
  formData.append('email', cleanEmail);
  formData.append('_replyto', cleanEmail);
  formData.append('_subject', `Nueva consulta desde Estudio Abierto — ${subjectName}`);
  formData.append('flow', cleanFlow);
  formData.append('selectedOptions', selectedOptionsText);
  formData.append('selectedOptionsJson', JSON.stringify(cleanOptions));
  formData.append('message', cleanMessage);
  formData.append('createdAt', createdAt);
  formData.append('summary', summary);

  if (lead.attachment) {
    formData.append('attachment', lead.attachment);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Formspree request failed');
  }

  return response.json();
}
