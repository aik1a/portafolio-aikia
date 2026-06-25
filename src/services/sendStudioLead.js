export async function sendStudioLead({ endpoint, lead, flow, selectedOptions }) {
  if (!endpoint) {
    throw new Error('Missing VITE_FORMSPREE_STUDIO_ENDPOINT');
  }

  const formData = new FormData();

  formData.append('source', 'Estudio Abierto');
  formData.append('name', lead.name);
  formData.append('email', lead.email);
  formData.append('message', lead.message);
  formData.append('flow', flow || '');
  formData.append('selectedOptions', JSON.stringify(selectedOptions || {}));
  formData.append('createdAt', new Date().toISOString());

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
