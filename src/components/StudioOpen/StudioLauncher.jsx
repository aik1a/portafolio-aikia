export default function StudioLauncher({ isOpen, unreadCount = 0, onToggle }) {
  return (
    <button
      className="studio-open__launcher"
      type="button"
      aria-label={isOpen ? 'Minimizar Estudio Abierto' : 'Abrir Estudio Abierto'}
      onClick={onToggle}
    >
      <span>Estudio Abierto ✦</span>
      {unreadCount > 0 && !isOpen ? (
        <strong className="studio-open__chat-notification-badge">{unreadCount}</strong>
      ) : null}
    </button>
  );
}
