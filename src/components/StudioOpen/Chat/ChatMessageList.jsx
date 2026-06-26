import { useEffect, useRef } from 'react';
import ChatMessageBubble from './ChatMessageBubble';

export default function ChatMessageList({
  messages,
  currentUserAlias,
  emptyText = 'No hay mensajes en esta sala. Se el primero en saludar!',
}) {
  const containerRef = useRef(null);
  const lastMessageId = messages.at(-1)?.id;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lastMessageId]);

  return (
    <div
      ref={containerRef}
      className="studio-open__chat-message-list"
    >
      {messages.length === 0 ? (
        <div className="studio-open__chat-empty">
          {emptyText}
        </div>
      ) : (
        <div className="studio-open__chat-message-container">
          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              isOwn={message.user === currentUserAlias}
            />
          ))}
        </div>
      )}
    </div>
  );
}
