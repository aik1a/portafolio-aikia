import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeChatText,
  validateChatAlias,
  validateChatMessage,
  validateChatRoom,
} from '../src/utils/chatValidation.js';
import { validateChatFile } from '../src/utils/chatFileValidation.js';
import { validateAlias } from '../server/utils/validateAlias.js';
import { validateMessage } from '../server/utils/validateMessage.js';
import { validateRoom } from '../server/utils/validateRoom.js';
import { validateFileMetadata } from '../server/utils/validateFile.js';

test('sanitizes chat text and validates frontend chat inputs', () => {
  assert.equal(sanitizeChatText('  <b>hola</b>  '), 'bhola/b');
  assert.equal(validateChatAlias('Ai'), true);
  assert.equal(validateChatAlias('A'), false);
  assert.equal(validateChatMessage('Hola'), true);
  assert.equal(validateChatMessage('   '), false);
  assert.equal(validateChatRoom('proyectos'), true);
  assert.equal(validateChatRoom('invalida'), false);
});

test('validates backend alias, room and message contracts', () => {
  assert.equal(validateAlias('Disenadora'), true);
  assert.equal(validateRoom('ia-aplicada'), true);
  assert.equal(validateMessage({ user: 'Aikia', text: 'Hola', attachment: null }), true);
  assert.equal(validateMessage({ user: 'Aikia', text: '   ', attachment: null }), false);
  assert.equal(validateMessage({ user: 'Aikia', text: '', attachment: { fileName: 'a.pdf' } }), true);
});

test('validates allowed and blocked chat files on frontend and backend', () => {
  const validPdf = { name: 'brief.pdf', originalname: 'brief.pdf', type: 'application/pdf', mimetype: 'application/pdf', size: 2000 };
  const blockedHtml = { name: 'page.html', originalname: 'page.html', type: 'text/html', mimetype: 'text/html', size: 2000 };
  const tooLarge = { name: 'big.pdf', type: 'application/pdf', size: 6 * 1024 * 1024 };

  assert.equal(validateChatFile(validPdf).ok, true);
  assert.equal(validateChatFile(blockedHtml).ok, false);
  assert.equal(validateChatFile(tooLarge).ok, false);
  assert.equal(validateFileMetadata(validPdf).ok, true);
  assert.equal(validateFileMetadata(blockedHtml).ok, false);
});
