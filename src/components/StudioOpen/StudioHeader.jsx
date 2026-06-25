import StudioIcon from './StudioIcon';

export default function StudioHeader({ title, subtitle, canGoBack, onBack, onClose }) {
  return (
    <header className="studio-open__header">
      <div className="studio-open__brand">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <div className="studio-open__controls">
        {canGoBack ? (
          <button className="studio-open__icon-button" type="button" aria-label="Volver" title="Volver" onClick={onBack}>
            <StudioIcon name="back" />
          </button>
        ) : null}
        <button className="studio-open__icon-button" type="button" aria-label="Cerrar" title="Cerrar" onClick={onClose}>
          <StudioIcon name="close" />
        </button>
      </div>
    </header>
  );
}
