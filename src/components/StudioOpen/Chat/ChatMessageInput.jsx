import { useRef, useState } from 'react';
import ChatSoundToggle from './ChatSoundToggle';

const EMOJIS = ['✨', '💡', '🎨', '🧩', '🚀', '👀', '✅', '🤝'];

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
      setText((prev) => (prev + emoji).slice(0, 500));
      return;
    }

    const input = inputRef.current;
    const start = input.selectionStart ?? text.length;
    const end = input.selectionEnd ?? text.length;
    const newText = text.substring(0, start) + emoji + text.substring(end);
    if (newText.length > 500) return;

    setText(newText);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 10);
  };

  return (
    <form onSubmit={handleSubmit} className="studio-open__chat-input-form">
      {showEmojiPanel ? (
        <div className="studio-open__chat-emoji-panel">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="studio-open__chat-emoji-btn"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      ) : null}

      <div className="studio-open__chat-input-row">
        <input
          ref={inputRef}
          type="text"
          className="studio-open__text-field studio-open__chat-input-field"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={500}
        />
        <button
          type="submit"
          className="studio-open__btn studio-open__btn--primary studio-open__chat-submit-btn"
          disabled={!text.trim() || text.length > 500}
        >
          Enviar
        </button>
      </div>

      <div className="studio-open__chat-control-bar">
        <div className="studio-open__chat-control-left">
          <button
            type="button"
            className="studio-open__icon-button studio-open__chat-action-btn"
            onClick={() => setShowEmojiPanel(!showEmojiPanel)}
            title="Insertar emoji"
          >
            😊
          </button>
        </div>

        <ChatSoundToggle isMuted={isMuted} onToggle={onToggleSound} />
      </div>
    </form>
  );
}
