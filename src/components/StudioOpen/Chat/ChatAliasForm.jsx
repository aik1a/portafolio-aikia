import { useState } from 'react';
import PanelHeading from '../PanelHeading';
import StudioSymbol from '../StudioSymbol';

export default function ChatAliasForm({ onSaveAlias }) {
  const [alias, setAlias] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = alias.trim();
    if (trimmed.length < 2 || trimmed.length > 30) {
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
        title="Identifícate"
        description="Ingresa un alias para participar en el chat en tiempo real. No requiere registro ni contraseña."
      />
      <form onSubmit={handleSubmit} className="studio-open__question-list" style={{ marginTop: '14px' }}>
        <div className={`studio-open__form-group${error ? ' has-error' : ''}`}>
          <label htmlFor="chat-alias-input">Tu Alias / Nombre:</label>
          <input
            className="studio-open__text-field"
            id="chat-alias-input"
            type="text"
            value={alias}
            placeholder="Ej. DiseñadorWeb"
            onChange={(event) => {
              setAlias(event.target.value);
              setError(false);
            }}
            maxLength={35}
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
          style={{ marginTop: '6px' }}
        >
          <StudioSymbol name="check" />
          Ingresar al chat
        </button>
      </form>
    </div>
  );
}
