export default function ChatSoundToggle({ isMuted, onToggle }) {
  return (
    <button
      className="studio-open__icon-button studio-open__chat-action-btn"
      type="button"
      onClick={onToggle}
      aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
      title={isMuted ? 'Sonido desactivado' : 'Sonido activado'}
    >
      <span>{isMuted ? '🔇' : '🔊'}</span>
    </button>
  );
}
