import StudioSymbol from './StudioSymbol';

export default function StudioState({ type, title, message, primaryActionLabel, secondaryActionLabel, onPrimaryAction, onSecondaryAction }) {
  return (
    <div className="studio-open__screen">
      <div className="studio-open__state-card">
        <span className="studio-open__state-icon"><StudioSymbol name={type === 'success' ? 'check' : 'alert'} /></span>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="studio-open__btn studio-open__btn--primary studio-open__btn--full" type="button" onClick={onPrimaryAction}>
          {primaryActionLabel}
        </button>
        {secondaryActionLabel ? (
          <button className="studio-open__small-link" type="button" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
