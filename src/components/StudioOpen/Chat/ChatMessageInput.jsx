import { useRef, useState } from 'react';
import ChatSoundToggle from './ChatSoundToggle';

const EMOJIS = ['✨', '💡', '🎨', '🧩', '🚀', '👀', '✅', '🤝', '📎'];

export default function ChatMessageInput({ onSendMessage, isMuted, onToggleSound }) {
  const [text, setText] = useState('');
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 500) return;
    onSendMessage(trimmed);
    setText('');
    setShowEmojiPanel(false);
  };

  const handleEmojiClick = (emoji) => {
    if (!inputRef.current) {
      setText((prev) => prev + emoji);
      return;
    }

    const input = inputRef.current;
    const start = input.selectionStart ?? text.length;
    const end = input.selectionEnd ?? text.length;

    const newText = text.substring(0, start) + emoji + text.substring(end);
    setText(newText);

    // Reposicionar el cursor después de insertar el emoji
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 10);
  };

  const handleAttachClick = () => {
    alert('Subida de archivos no implementada en esta fase.');
  };

  return (
    <form onSubmit={handleSubmit} className="studio-open__chat-input-form" style={{ width: '100%' }}>
      {showEmojiPanel ? (
        <div
          className="studio-open__emoji-panel"
          style={{
            display: 'flex',
            gap: '8px',
            padding: '8px',
            background: 'rgba(255, 251, 242, 0.9)',
            border: '1px solid rgba(22, 20, 17, 0.1)',
            borderRadius: '12px',
            marginBottom: '6px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {emoji}
            </button>
          ))}
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
        <input
          ref={inputRef}
          type="text"
          className="studio-open__text-field"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={500}
          style={{
            flex: '1',
            borderRadius: '12px',
            height: '36px',
            padding: '0 12px',
            fontSize: '13px',
          }}
        />
        <button
          type="submit"
          className="studio-open__btn studio-open__btn--primary"
          disabled={!text.trim() || text.length > 500}
          style={{
            height: '36px',
            padding: '0 14px',
            borderRadius: '12px',
          }}
        >
          Enviar
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6px',
          padding: '0 2px',
        }}
      >
        {/* Lado izquierdo: Emojis y Adjuntar */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            className="studio-open__icon-button"
            onClick={() => setShowEmojiPanel(!showEmojiPanel)}
            title="Insertar emoji"
            style={{
              width: '32px',
              height: '32px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid rgba(22, 20, 17, 0.1)',
              background: 'rgba(255, 251, 242, 0.6)',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            😊
          </button>
          <button
            type="button"
            className="studio-open__icon-button"
            onClick={handleAttachClick}
            title="Adjuntar archivo (No disponible)"
            style={{
              width: '32px',
              height: '32px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid rgba(22, 20, 17, 0.1)',
              background: 'rgba(255, 251, 242, 0.6)',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            📎
          </button>
        </div>

        {/* Lado derecho: Control de sonido (Claramente separado) */}
        <div>
          <ChatSoundToggle isMuted={isMuted} onToggle={onToggleSound} />
        </div>
      </div>
    </form>
  );
}
