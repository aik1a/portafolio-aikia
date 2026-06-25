import { useState } from 'react';
import { sanitizeChatText, validateChatAlias } from '../../../utils/chatValidation';
import PanelHeading from '../PanelHeading';
import StudioSymbol from '../StudioSymbol';

export default function ChatAliasForm({ onSaveAlias }) {
  const [alias, setAlias] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = sanitizeChatText(alias);
    if (!validateChatAlias(trimmed)) {
      setError(true);
      return;
    }
    setError(false);
    onSaveAlias(trimmed);
  };

  return (
    <div className="studio-open__screen">
      <PanelHeading
        icon="robot"
        title="Identificate"
        description="Ingresa un alias para participar en el chat en tiempo real. No requiere registro ni contrasena."
      />
      <form onSubmit={handleSubmit} className="studio-open__question-list studio-open__chat-alias-form">
        <div className={`studio-open__form-group${error ? ' has-error' : ''}`}>
          <label htmlFor="chat-alias-input">Tu Alias / Nombre:</label>
          <input
            className="studio-open__text-field"
            id="chat-alias-input"
            type="text"
            value={alias}
            placeholder="Ej. DisenadorWeb"
            onChange={(event) => {
              setAlias(event.target.value);
              setError(false);
            }}
            maxLength={30}
            autoFocus
          />
          {error ? (
            <p className="studio-open__field-error">
              El alias debe tener entre 2 y 30 caracteres.
            </p>
          ) : null}
        </div>
        <button
          className="studio-open__btn studio-open__btn--primary studio-open__btn--full"
          type="submit"
        >
          <StudioSymbol name="check" />
          Ingresar al chat
        </button>
      </form>
    </div>
  );
}
