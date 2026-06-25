export default function ChatMessageBubble({ message, isOwn }) {
  if (message.user === 'system') {
    return (
      <div className="studio-open__system-message studio-open__chat-message--system">
        <span>{message.text}</span>
      </div>
    );
  }

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const timeStr = formatTime(message.createdAt);

  return (
    <div className={`studio-open__chat-message ${isOwn ? 'studio-open__chat-message--own' : 'studio-open__chat-message--other'}`}>
      <span className="studio-open__chat-message-author">
        {isOwn ? 'Tu' : message.user}
      </span>
      <div className="studio-open__chat-bubble">
        {message.text ? <p>{message.text}</p> : null}
        {message.attachment ? (
          <a
            className="studio-open__chat-attachment-card"
            href={message.attachment.url}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{message.attachment.originalName}</strong>
            <span>{Math.ceil(message.attachment.size / 1024)} KB</span>
          </a>
        ) : null}
        {timeStr ? <span className="studio-open__chat-bubble-time">{timeStr}</span> : null}
      </div>
    </div>
  );
}
