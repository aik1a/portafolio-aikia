export default function ChatMessageBubble({ message, isOwn }) {
  if (message.user === 'system') {
    return (
      <div
        className="studio-open__system-message"
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '8px 0',
          padding: '4px 8px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            color: 'var(--studio-open-muted)',
            fontStyle: 'italic',
            textAlign: 'center',
            background: 'rgba(22, 20, 17, 0.05)',
            padding: '2px 8px',
            borderRadius: '999px',
          }}
        >
          {message.text}
        </span>
      </div>
    );
  }

  const timeStr = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div
      className="studio-open__message-row"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOwn ? 'flex-end' : 'flex-start',
        margin: '10px 0',
        width: '100%',
      }}
    >
      <span
        className="studio-open__author"
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'var(--studio-open-muted)',
          marginBottom: '2px',
          paddingLeft: isOwn ? '0' : '4px',
          paddingRight: isOwn ? '4px' : '0',
        }}
      >
        {isOwn ? 'Tú' : message.user}
      </span>
      <div
        className={`studio-open__bubble ${isOwn ? 'studio-open__bubble--user' : 'studio-open__bubble--assistant'}`}
        style={{
          display: 'inline-block',
          wordBreak: 'break-word',
          maxWidth: '85%',
          background: isOwn ? 'var(--studio-open-pink)' : 'var(--studio-open-green-soft)',
          padding: '8px 12px',
          borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          boxShadow: '0 2px 6px rgba(52, 40, 24, 0.05)',
        }}
      >
        <p
          style={{
            margin: '0',
            fontSize: '12.5px',
            lineHeight: '1.4',
            color: 'var(--studio-open-ink)',
          }}
        >
          {message.text}
        </p>
        <span
          style={{
            display: 'block',
            fontSize: '9px',
            color: 'rgba(22, 20, 17, 0.45)',
            textAlign: 'right',
            marginTop: '4px',
          }}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
}
