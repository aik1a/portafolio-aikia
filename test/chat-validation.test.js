import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeChatText,
  validateChatAlias,
  validateChatMessage,
  validateChatRoom,
} from '../src/utils/chatValidation.js';
import { validateAlias } from '../server/utils/validateAlias.js';
import { validateMessage } from '../server/utils/validateMessage.js';
import { validateRoom } from '../server/utils/validateRoom.js';

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
  assert.equal(validateMessage({ user: 'Aikia', text: 'Hola' }), true);
  assert.equal(validateMessage({ user: 'Aikia', text: '   ' }), false);
});
