export const CHAT_ROOM_IDS = [
  'proyectos',
  'producto-ux',
  'ia-aplicada',
  'colaboraciones',
  'comisiones-web',
  'trayectoria',
];

export function validateRoom(roomId) {
  return CHAT_ROOM_IDS.includes(roomId);
}
