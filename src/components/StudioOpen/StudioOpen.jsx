import { useEffect, useRef, useState } from 'react';
import { studioCopy } from '../../data/studioCopy';
import { flowQuestions, mainActions, workAreas } from '../../data/studioOptions';
import { sendStudioLead } from '../../services/sendStudioLead';
import { validateAttachment, validateEmail, validateMessage, validateName } from '../../utils/studioValidation';
import './StudioOpen.css';

const STUDIO_SCREENS = {
  HOME: 'home',
  AREAS: 'areas',
  IDEA: 'idea',
  WEB: 'web',
  COLLAB: 'collab',
  NEXT: 'next',
  LEAD: 'lead',
  ATTACHMENT: 'attachment',
  CONTACT: 'contact',
  SUCCESS: 'success',
  ERROR: 'error',
};

const FLOW_SCREENS = {
  idea: STUDIO_SCREENS.IDEA,
  web: STUDIO_SCREENS.WEB,
  collab: STUDIO_SCREENS.COLLAB,
};

const screenHeader = {
  [STUDIO_SCREENS.HOME]: studioCopy.header,
  [STUDIO_SCREENS.AREAS]: { title: 'Áreas de trabajo', subtitle: 'Líneas principales' },
  [STUDIO_SCREENS.IDEA]: { title: 'Ordenemos tu idea', subtitle: 'Preguntas breves' },
  [STUDIO_SCREENS.WEB]: { title: 'Página web', subtitle: 'Solicitud guiada' },
  [STUDIO_SCREENS.COLLAB]: { title: 'Colaboremos', subtitle: 'Propuestas y networking' },
  [STUDIO_SCREENS.NEXT]: { title: 'Siguiente paso', subtitle: 'Enviar o revisar' },
  [STUDIO_SCREENS.LEAD]: { title: 'Envía una consulta', subtitle: 'Cuéntame tu idea' },
  [STUDIO_SCREENS.ATTACHMENT]: { title: 'Archivos', subtitle: 'Paso opcional' },
  [STUDIO_SCREENS.CONTACT]: { title: 'Contacto', subtitle: 'Respuesta por correo' },
  [STUDIO_SCREENS.SUCCESS]: { title: 'Solicitud enviada', subtitle: 'Confirmación' },
  [STUDIO_SCREENS.ERROR]: { title: 'No se pudo enviar', subtitle: 'Intenta otra vez' },
};

const studioSymbols = {
  briefcase: '💼',
  bulb: '💡',
  laptop: '💻',
  handshake: '🤝',
  sparkles: '✨',
  robot: '🤖',
  memo: '📝',
  compass: '🧭',
  paperclip: '📎',
  mail: '✉️',
  check: '✅',
  alert: '⚠️',
  down: '📁',
};

const initialLead = {
  name: '',
  message: '',
  email: '',
  attachment: null,
};

function StudioIcon({ name }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2.2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  switch (name) {
    case 'back':
      return <svg {...commonProps}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>;
    case 'close':
      return <svg {...commonProps}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
    case 'chevron':
      return <svg {...commonProps}><path d="m9 18 6-6-6-6" /></svg>;
    case 'down':
      return <svg {...commonProps}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>;
    case 'briefcase':
      return <svg {...commonProps}><path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><rect x="3" y="6" width="18" height="14" rx="3" /><path d="M3 12h18" /></svg>;
    case 'bulb':
      return <svg {...commonProps}><path d="M9 18h6" /><path d="M10 22h4" /><path d="M8 14a6 6 0 1 1 8 0c-.8.7-1 1.4-1 2H9c0-.6-.2-1.3-1-2Z" /></svg>;
    case 'laptop':
      return <svg {...commonProps}><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M2 19h20" /><path d="M8 19h8" /></svg>;
    case 'handshake':
      return <svg {...commonProps}><path d="m8 12 2.2-2.2a2.2 2.2 0 0 1 3.1 0l.7.7" /><path d="M14 10.5 16 9l4 4-2 2" /><path d="M4 13l4-4 2 2" /><path d="m9 15 2 2a2 2 0 0 0 2.8 0L18 13" /></svg>;
    case 'sparkles':
      return <svg {...commonProps}><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" /></svg>;
    case 'robot':
      return <svg {...commonProps}><rect x="5" y="8" width="14" height="10" rx="3" /><path d="M12 8V4" /><path d="M9 13h.01" /><path d="M15 13h.01" /><path d="M9 17h6" /></svg>;
    case 'memo':
      return <svg {...commonProps}><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4" /><path d="M9 12h6" /><path d="M9 16h4" /></svg>;
    case 'compass':
      return <svg {...commonProps}><circle cx="12" cy="12" r="9" /><path d="m15 9-2 5-5 2 2-5 5-2Z" /></svg>;
    case 'paperclip':
      return <svg {...commonProps}><path d="m21 12.5-8.5 8.5a5 5 0 0 1-7-7L14 5.5a3.2 3.2 0 0 1 4.5 4.5l-8.3 8.3a1.5 1.5 0 0 1-2.1-2.1l7.2-7.2" /></svg>;
    case 'mail':
      return <svg {...commonProps}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>;
    case 'check':
      return <svg {...commonProps}><path d="M20 6 9 17l-5-5" /></svg>;
    case 'alert':
      return <svg {...commonProps}><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>;
    default:
      return <svg {...commonProps}><circle cx="12" cy="12" r="8" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>;
  }
}

function StudioHeader({ title, subtitle, canGoBack, onBack, onClose }) {
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

function StudioSymbol({ name }) {
  return (
    <span className="studio-open__symbol" aria-hidden="true">
      {studioSymbols[name] || '✦'}
    </span>
  );
}

function StudioLauncher({ isOpen, onToggle }) {
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

function ActionRow({ action, onClick }) {
  return (
    <button className="studio-open__action-row" type="button" onClick={onClick}>
      <span className="studio-open__row-icon"><StudioSymbol name={action.icon} /></span>
      <span className="studio-open__row-text">
        <strong>{action.title}</strong>
        <span>{action.description}</span>
      </span>
      <span className="studio-open__chevron"><StudioIcon name="chevron" /></span>
    </button>
  );
}

function ProjectsButton({ onClick }) {
  return (
    <button className="studio-open__projects-link" type="button" onClick={onClick}>
      <span>
        <strong>{studioCopy.home.projectsTitle}</strong>
        <span>{studioCopy.home.projectsDescription}</span>
      </span>
      <StudioIcon name="down" />
    </button>
  );
}

function StudioHome({ onSelectFlow, onProjectsClick }) {
  return (
    <div className="studio-open__screen">
      <div className="studio-open__thread">
        <div className="studio-open__message studio-open__message--assistant">
          <div className="studio-open__avatar-shell" aria-hidden="true">
            <div className="studio-open__avatar-placeholder">
              <span />
            </div>
          </div>
          <div>
            <p className="studio-open__author">Estudio Abierto</p>
            <div className="studio-open__bubble studio-open__bubble--assistant">
              <h2>{studioCopy.home.assistantTitle}</h2>
              <p>{studioCopy.home.assistantText}</p>
            </div>
          </div>
        </div>
        <div className="studio-open__message studio-open__message--user">
          <div className="studio-open__bubble studio-open__bubble--user">{studioCopy.home.userQuestion}</div>
        </div>
      </div>

      <div className="studio-open__action-list" aria-label="Opciones principales">
        {mainActions.map((action) => (
          <ActionRow
            key={action.id}
            action={action}
            onClick={() => onSelectFlow(action.id, action.screen)}
          />
        ))}
      </div>

      <ProjectsButton onClick={onProjectsClick} />
    </div>
  );
}

function PanelHeading({ icon, title, description }) {
  return (
    <div className="studio-open__heading">
      <div className="studio-open__heading-row">
        <span className="studio-open__heading-icon"><StudioSymbol name={icon} /></span>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

function StudioAreas({ onNext, onProjectsClick }) {
  return (
    <div className="studio-open__screen">
      <PanelHeading icon="briefcase" title={studioCopy.areas.title} description={studioCopy.areas.description} />
      <div className="studio-open__info-list">
        {workAreas.map((area) => (
          <article className="studio-open__info-item" key={area.id}>
            <span className="studio-open__info-icon"><StudioSymbol name={area.icon} /></span>
            <div>
              <strong>{area.title}</strong>
              <p>{area.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="studio-open__button-row">
        <button className="studio-open__btn" type="button" onClick={onProjectsClick}>
          <StudioSymbol name="down" />
          Revisar proyectos
        </button>
        <button className="studio-open__btn studio-open__btn--primary" type="button" onClick={onNext}>
          <StudioSymbol name="mail" />
          Siguiente paso
        </button>
      </div>
    </div>
  );
}

function StudioFlowScreen({ title, description, icon, questions, selectedOptions, onSelectOption, onNext }) {
  return (
    <div className="studio-open__screen">
      <PanelHeading icon={icon} title={title} description={description} />
      <div className="studio-open__question-list">
        {questions.map((group) => (
          <div className="studio-open__question-block" key={group.id}>
            <div className="studio-open__question-title">
              <StudioSymbol name={group.icon} />
              {group.question}
            </div>
            <div className="studio-open__chip-grid">
              {group.options.map((option) => {
                const isSelected = selectedOptions[group.id] === option;
                return (
                  <button
                    className={`studio-open__chip${isSelected ? ' is-selected' : ''}`}
                    type="button"
                    key={option}
                    aria-pressed={isSelected}
                    onClick={() => onSelectOption(group.id, option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button className="studio-open__btn studio-open__btn--primary studio-open__btn--full" type="button" onClick={onNext}>
        <StudioSymbol name="sparkles" />
        Continuar
      </button>
    </div>
  );
}

function StudioNextStep({ onProjectsClick, onLead }) {
  return (
    <div className="studio-open__screen">
      <div className="studio-open__next-step">
        <span className="studio-open__state-icon"><StudioSymbol name="sparkles" /></span>
        <h2>{studioCopy.next.title}</h2>
        <p>{studioCopy.next.main}</p>
        <p>{studioCopy.next.secondary}</p>
        <div className="studio-open__notice">
          <StudioSymbol name="paperclip" />
          <span>{studioCopy.next.attachment}</span>
        </div>
        <div className="studio-open__button-row">
          <button className="studio-open__btn" type="button" onClick={onProjectsClick}>
            <StudioSymbol name="down" />
            Revisar proyectos
          </button>
          <button className="studio-open__btn studio-open__btn--primary" type="button" onClick={onLead}>
            <StudioSymbol name="mail" />
            Enviar consulta
          </button>
        </div>
      </div>
    </div>
  );
}

function StudioLeadForm({ lead, errors, onChange, onContinue }) {
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

function StudioAttachment({ file, error, onAttach, onRemove, onContinue, onSkip }) {
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

function StudioContact({ email, error, submitStatus, onChange, onSubmit }) {
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

function StudioState({ type, title, message, primaryActionLabel, secondaryActionLabel, onPrimaryAction, onSecondaryAction }) {
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

export default function StudioOpen() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState(STUDIO_SCREENS.HOME);
  const [, setScreenHistory] = useState([]);
  const [flow, setFlow] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [lead, setLead] = useState(initialLead);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeStudio();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [screen]);

  function openStudio() {
    setIsOpen(true);
  }

  function closeStudio() {
    setIsOpen(false);
  }

  function goToScreen(nextScreen) {
    if (nextScreen === screen) return;
    setScreenHistory((history) => [...history, screen]);
    setScreen(nextScreen);
  }

  function goBack() {
    setScreenHistory((history) => {
      if (history.length === 0) {
        setScreen(STUDIO_SCREENS.HOME);
        return [];
      }

      const nextHistory = history.slice(0, -1);
      setScreen(history[history.length - 1]);
      return nextHistory;
    });
  }

  function selectFlow(nextFlow, nextScreen) {
    setFlow(nextFlow === 'areas' ? null : nextFlow);
    goToScreen(nextScreen);
  }

  function selectOption(group, value) {
    setSelectedOptions((currentOptions) => ({
      ...currentOptions,
      [group]: currentOptions[group] === value ? undefined : value,
    }));
  }

  function updateLeadField(field, value) {
    setLead((currentLead) => ({
      ...currentLead,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: false,
    }));
  }

  function setAttachment(file) {
    const validation = validateAttachment(file);

    if (!validation.ok) {
      setLead((currentLead) => ({ ...currentLead, attachment: null }));
      setErrors((currentErrors) => ({
        ...currentErrors,
        attachment: studioCopy.attachment.error,
      }));
      return;
    }

    setLead((currentLead) => ({ ...currentLead, attachment: file }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      attachment: false,
    }));
  }

  function removeAttachment() {
    setLead((currentLead) => ({ ...currentLead, attachment: null }));
    setErrors((currentErrors) => ({ ...currentErrors, attachment: false }));
  }

  function handleProjectsClick() {
    const target = document.querySelector('#proyectos');

    if (!target) {
      console.warn('No se encontró #proyectos');
      return;
    }

    closeStudio();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // eslint-disable-next-line no-unused-vars
  function handleContactClick() {
    const target = document.querySelector('#contacto');

    if (!target) {
      console.warn('No se encontró #contacto');
      return;
    }

    closeStudio();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleLeadContinue() {
    const nextErrors = {
      name: !validateName(lead.name),
      message: !validateMessage(lead.message),
    };

    setErrors((currentErrors) => ({
      ...currentErrors,
      ...nextErrors,
    }));

    if (nextErrors.name || nextErrors.message) return;

    goToScreen(STUDIO_SCREENS.ATTACHMENT);
  }

  function handleAttachmentContinue() {
    setErrors((currentErrors) => ({ ...currentErrors, attachment: false }));
    goToScreen(STUDIO_SCREENS.CONTACT);
  }

  async function handleSubmit() {
    if (submitStatus === 'sending') return;

    if (!validateEmail(lead.email)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        email: true,
      }));
      return;
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      email: false,
    }));
    setSubmitStatus('sending');

    try {
      await sendStudioLead({
        endpoint: import.meta.env.VITE_FORMSPREE_STUDIO_ENDPOINT,
        lead,
        flow,
        selectedOptions,
      });
      setSubmitStatus('success');
      goToScreen(STUDIO_SCREENS.SUCCESS);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      goToScreen(STUDIO_SCREENS.ERROR);
    }
  }

  function reviewFailedSubmission() {
    setSubmitStatus('idle');
    goToScreen(lead.attachment ? STUDIO_SCREENS.ATTACHMENT : STUDIO_SCREENS.CONTACT);
  }

  function resetStudio() {
    setScreen(STUDIO_SCREENS.HOME);
    setScreenHistory([]);
    setFlow(null);
    setSelectedOptions({});
    setLead(initialLead);
    setErrors({});
    setSubmitStatus('idle');
  }

  const header = screenHeader[screen] || studioCopy.header;
  const activeFlowScreen = flow && FLOW_SCREENS[flow] === screen ? flow : null;

  return (
    <div className={`studio-open${isOpen ? ' is-open' : ''}`}>
      <section className="studio-open__panel" role="dialog" aria-label="Estudio Abierto" aria-modal="false">
        <StudioHeader
          title={header.title}
          subtitle={header.subtitle}
          canGoBack={screen !== STUDIO_SCREENS.HOME}
          onBack={goBack}
          onClose={closeStudio}
        />
        <div className="studio-open__body" ref={bodyRef}>
          {screen === STUDIO_SCREENS.HOME ? (
            <StudioHome onSelectFlow={selectFlow} onProjectsClick={handleProjectsClick} />
          ) : null}

          {screen === STUDIO_SCREENS.AREAS ? (
            <StudioAreas onNext={() => goToScreen(STUDIO_SCREENS.NEXT)} onProjectsClick={handleProjectsClick} />
          ) : null}

          {activeFlowScreen ? (
            <StudioFlowScreen
              title={studioCopy[activeFlowScreen].title}
              description={studioCopy[activeFlowScreen].description}
              icon={mainActions.find((action) => action.id === activeFlowScreen)?.icon || 'memo'}
              questions={flowQuestions[activeFlowScreen]}
              selectedOptions={selectedOptions}
              onSelectOption={selectOption}
              onNext={() => goToScreen(STUDIO_SCREENS.NEXT)}
            />
          ) : null}

          {screen === STUDIO_SCREENS.NEXT ? (
            <StudioNextStep onProjectsClick={handleProjectsClick} onLead={() => goToScreen(STUDIO_SCREENS.LEAD)} />
          ) : null}

          {screen === STUDIO_SCREENS.LEAD ? (
            <StudioLeadForm
              lead={lead}
              errors={errors}
              onChange={updateLeadField}
              onContinue={handleLeadContinue}
            />
          ) : null}

          {screen === STUDIO_SCREENS.ATTACHMENT ? (
            <StudioAttachment
              file={lead.attachment}
              error={errors.attachment}
              onAttach={setAttachment}
              onRemove={removeAttachment}
              onContinue={handleAttachmentContinue}
              onSkip={handleAttachmentContinue}
            />
          ) : null}

          {screen === STUDIO_SCREENS.CONTACT ? (
            <StudioContact
              email={lead.email}
              error={errors.email}
              submitStatus={submitStatus}
              onChange={updateLeadField}
              onSubmit={handleSubmit}
            />
          ) : null}

          {screen === STUDIO_SCREENS.SUCCESS ? (
            <StudioState
              type="success"
              title={studioCopy.success.title}
              message={studioCopy.success.message}
              primaryActionLabel="Volver al inicio"
              onPrimaryAction={resetStudio}
            />
          ) : null}

          {screen === STUDIO_SCREENS.ERROR ? (
            <StudioState
              type="error"
              title={studioCopy.error.title}
              message={studioCopy.error.message}
              primaryActionLabel="Revisar envío"
              secondaryActionLabel="Volver al inicio"
              onPrimaryAction={reviewFailedSubmission}
              onSecondaryAction={resetStudio}
            />
          ) : null}
        </div>
      </section>

      <StudioLauncher isOpen={isOpen} onToggle={isOpen ? closeStudio : openStudio} />
    </div>
  );
}
