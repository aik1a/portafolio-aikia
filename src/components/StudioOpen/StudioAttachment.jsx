import { studioCopy } from '../../data/studioCopy';
import PanelHeading from './PanelHeading';
import StudioSymbol from './StudioSymbol';

export default function StudioAttachment({ file, error, onAttach, onRemove, onContinue, onSkip }) {
  return (
    <div className="studio-open__screen">
      <PanelHeading icon="paperclip" title={studioCopy.attachment.title} description={studioCopy.attachment.description} />
      <div className="studio-open__file-zone">
        <div className={`studio-open__file-status${file ? ' is-ok' : ''}${error ? ' has-error' : ''}`} role="status" aria-live="polite">
          <StudioSymbol name={error ? 'alert' : file ? 'check' : 'paperclip'} />
          <span>
            {error || (file ? `${studioCopy.attachment.success}: ${file.name}` : studioCopy.attachment.empty)}
          </span>
        </div>
        <label className="studio-open__btn studio-open__file-button" htmlFor="studio-file-input">
          <StudioSymbol name="paperclip" />
          Adjuntar archivo
        </label>
        <input
          id="studio-file-input"
          className="studio-open__file-input"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.txt"
          onChange={(event) => onAttach(event.target.files?.[0] || null)}
        />
        {file ? (
          <button className="studio-open__small-link" type="button" onClick={onRemove}>
            Quitar archivo
          </button>
        ) : null}
        <button className="studio-open__btn studio-open__btn--primary" type="button" onClick={onContinue}>
          <StudioSymbol name="mail" />
          Continuar
        </button>
        <button className="studio-open__small-link" type="button" onClick={onSkip}>
          Omitir este paso
        </button>
      </div>
      <p className="studio-open__footer-note">{studioCopy.attachment.helper}</p>
    </div>
  );
}
