import { useEffect, useRef } from 'react';
import ChatMessageBubble from './ChatMessageBubble';

export default function ChatMessageList({ messages, currentUserAlias }) {
  const containerRef = useRef(null);

  // Auto-scroll al final del listado al recibir mensajes nuevos
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="studio-open__chat-message-list"
      style={{
        flex: '1 1 auto',
        overflowY: 'auto',
        padding: '8px 4px',
        maxHeight: '300px',
        minHeight: '200px',
        border: '1px solid rgba(22, 20, 17, 0.08)',
        borderRadius: '16px',
        background: 'var(--studio-open-cream)',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.length === 0 ? (
        <div
          style={{
            flex: '1',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--studio-open-muted)',
            fontSize: '12px',
            textAlign: 'center',
            padding: '20px',
            fontStyle: 'italic',
          }}
        >
          No hay mensajes en esta sala. ¡Sé el primero en saludar!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
