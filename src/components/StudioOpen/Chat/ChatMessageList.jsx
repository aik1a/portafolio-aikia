import { useEffect, useLayoutEffect, useRef } from 'react';
import ChatMessageBubble from './ChatMessageBubble';

export default function ChatMessageList({
  messages,
  currentUserAlias,
  onLoadMore,
  isLoadingMore,
  hasMore,
  emptyText = 'No hay mensajes en esta sala. Se el primero en saludar!',
}) {
  const containerRef = useRef(null);
  const previousHeightRef = useRef(0);
  const lastMessageId = messages.at(-1)?.id;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lastMessageId]);

  useLayoutEffect(() => {
    if (!isLoadingMore && previousHeightRef.current && containerRef.current) {
      const nextHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop = nextHeight - previousHeightRef.current;
      previousHeightRef.current = 0;
    }
  }, [isLoadingMore, messages]);

  const handleScroll = () => {
    if (!containerRef.current || !hasMore || isLoadingMore) return;
    if (containerRef.current.scrollTop <= 12) {
      previousHeightRef.current = containerRef.current.scrollHeight;
      onLoadMore?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className="studio-open__chat-message-list"
      onScroll={handleScroll}
    >
      {isLoadingMore ? (
        <div className="studio-open__chat-history-state">Cargando mensajes anteriores...</div>
      ) : null}
      {!hasMore && messages.length > 0 ? (
        <div className="studio-open__chat-history-state">No hay mas mensajes anteriores.</div>
      ) : null}
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
