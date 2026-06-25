import { CHAT_ROOMS } from '../../../data/chatRooms';

export default function ChatRoomSelector({ activeRoomId, unreadRooms = {}, onSelectRoom }) {
  return (
    <div className="studio-open__form-group studio-open__chat-room-selector">
      <label className="studio-open__chat-room-label" htmlFor="chat-room-select">
        Sala de conversacion:
      </label>
      <div className="studio-open__chip-grid" id="chat-room-select" role="radiogroup" aria-label="Seleccionar sala de chat">
        {CHAT_ROOMS.map((room) => {
          const isSelected = room.id === activeRoomId;
          const hasUnread = Boolean(unreadRooms[room.id]);
          return (
            <button
              key={room.id}
              className={`studio-open__chip studio-open__chat-room-chip${isSelected ? ' is-selected' : ''}${hasUnread ? ' has-unread' : ''}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectRoom(room.id)}
            >
              # {room.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
