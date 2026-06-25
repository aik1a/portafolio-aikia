export default function StudioLauncher({ isOpen, onToggle }) {
  return (
    <button
      className="studio-open__launcher"
      type="button"
      aria-label={isOpen ? 'Minimizar Estudio Abierto' : 'Abrir Estudio Abierto'}
      onClick={onToggle}
    >
      <span>Estudio Abierto ✦</span>
    </button>
  );
}
