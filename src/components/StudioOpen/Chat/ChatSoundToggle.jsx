export default function ChatSoundToggle({ isMuted, onToggle }) {
  return (
    <button
      className="studio-open__icon-button"
      type="button"
      onClick={onToggle}
      aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
      title={isMuted ? 'Sonido desactivado' : 'Sonido activado'}
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
        padding: '0',
      }}
    >
      <span>{isMuted ? '🔇' : '🔊'}</span>
    </button>
  );
}
