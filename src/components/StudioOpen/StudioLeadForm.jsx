import { studioCopy } from '../../data/studioCopy';
import PanelHeading from './PanelHeading';
import StudioSymbol from './StudioSymbol';

export default function StudioLeadForm({ lead, errors, onChange, onContinue }) {
  return (
    <div className="studio-open__screen">
      <PanelHeading icon="memo" title={studioCopy.lead.title} description={studioCopy.lead.description} />
      <div className={`studio-open__form-group${errors.name ? ' has-error' : ''}`}>
        <label htmlFor="studio-lead-name">{studioCopy.lead.nameLabel}</label>
        <input
          className="studio-open__text-field"
          id="studio-lead-name"
          type="text"
          value={lead.name}
          placeholder={studioCopy.lead.namePlaceholder}
          onChange={(event) => onChange('name', event.target.value)}
        />
        {errors.name ? <p className="studio-open__field-error">{studioCopy.lead.nameError}</p> : null}
      </div>
      <div className={`studio-open__form-group${errors.message ? ' has-error' : ''}`}>
        <label htmlFor="studio-lead-message">{studioCopy.lead.messageLabel}</label>
        <textarea
          className="studio-open__textarea-field"
          id="studio-lead-message"
          value={lead.message}
          placeholder={studioCopy.lead.messagePlaceholder}
          onChange={(event) => onChange('message', event.target.value)}
        />
        {errors.message ? <p className="studio-open__field-error">{studioCopy.lead.messageError}</p> : null}
      </div>
      <button className="studio-open__btn studio-open__btn--primary studio-open__btn--full" type="button" onClick={onContinue}>
        <StudioSymbol name="paperclip" />
        Continuar
      </button>
    </div>
  );
}
