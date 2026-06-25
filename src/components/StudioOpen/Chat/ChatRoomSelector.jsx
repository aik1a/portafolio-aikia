import { CHAT_ROOMS } from '../../../data/chatRooms';

export default function ChatRoomSelector({ activeRoomId, onSelectRoom }) {
  return (
    <div className="studio-open__form-group">
      <label htmlFor="chat-room-select" style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 'bold' }}>
        Sala de conversación:
      </label>
      <div className="studio-open__chip-grid" id="chat-room-select" role="radiogroup" aria-label="Seleccionar sala de chat">
        {CHAT_ROOMS.map((room) => {
          const isSelected = room.id === activeRoomId;
          return (
            <button
              key={room.id}
              className={`studio-open__chip${isSelected ? ' is-selected' : ''}`}
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
