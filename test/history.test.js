import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeRoomMessages } from '../src/services/chatLocalHistory.js';
import { paginateMessages } from '../server/utils/paginateMessages.js';

function message(id, minutes) {
  return {
    id,
    room: 'proyectos',
    user: 'Aikia',
    text: id,
    createdAt: new Date(Date.UTC(2026, 0, 1, 0, minutes)).toISOString(),
    attachment: null,
  };
}

test('merges local history without duplicate ids and keeps chronological order', () => {
  const result = mergeRoomMessages([message('2', 2), message('1', 1)], [message('2', 3), message('3', 4)]);
  assert.deepEqual(result.map((item) => item.id), ['1', '2', '3']);
  assert.equal(result.find((item) => item.id === '2').createdAt, message('2', 3).createdAt);
});

test('paginates fewer than limit without more pages', () => {
  const result = paginateMessages([message('1', 1), message('2', 2)], { limit: 20 });
  assert.deepEqual(result.messages.map((item) => item.id), ['1', '2']);
  assert.equal(result.hasMore, false);
});

test('paginates exactly limit without false extra page', () => {
  const messages = Array.from({ length: 20 }, (_, index) => message(String(index + 1), index + 1));
  const result = paginateMessages(messages, { limit: 20 });
  assert.equal(result.messages.length, 20);
  assert.equal(result.hasMore, false);
});

test('paginates more than limit and reports more pages', () => {
  const messages = Array.from({ length: 25 }, (_, index) => message(String(index + 1), index + 1));
  const result = paginateMessages(messages, { limit: 20 });
  assert.deepEqual(result.messages.map((item) => item.id)[0], '6');
  assert.equal(result.hasMore, true);
});
