import { studioCopy } from '../../data/studioCopy';
import PanelHeading from './PanelHeading';
import StudioSymbol from './StudioSymbol';

export default function StudioContact({ email, error, submitStatus, onChange, onSubmit }) {
  const isSending = submitStatus === 'sending';

  return (
    <div className="studio-open__screen">
      <PanelHeading icon="mail" title={studioCopy.contact.title} description={studioCopy.contact.description} />
      <div className={`studio-open__form-group${error ? ' has-error' : ''}`}>
        <label htmlFor="studio-contact-email">{studioCopy.contact.label}</label>
        <input
          className="studio-open__text-field"
          id="studio-contact-email"
          type="email"
          value={email}
          placeholder={studioCopy.contact.placeholder}
          onChange={(event) => onChange('email', event.target.value)}
        />
        {error ? <p className="studio-open__field-error">{studioCopy.contact.error}</p> : null}
      </div>
      <button className="studio-open__btn studio-open__btn--primary studio-open__btn--full" type="button" disabled={isSending} onClick={onSubmit}>
        <StudioSymbol name="mail" />
        {isSending ? 'Enviando...' : 'Enviar consulta →'}
      </button>
    </div>
  );
}
