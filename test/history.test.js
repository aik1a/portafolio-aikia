import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeRoomMessages } from '../src/services/chatLocalHistory.js';

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
