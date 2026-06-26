import { useCallback, useEffect, useRef, useState } from 'react';
import { studioCopy } from '../../data/studioCopy';
import { flowQuestions, mainActions, workAreas } from '../../data/studioOptions';
import { sendStudioLead } from '../../services/sendStudioLead';
import { useStudioChatController } from '../../hooks/useStudioChatController';
import { validateEmail, validateMessage, validateName } from '../../utils/studioValidation';
import StudioHeader from './StudioHeader';
import StudioLauncher from './StudioLauncher';
import StudioHome from './StudioHome';
import StudioFlowScreen from './StudioFlowScreen';
import StudioLeadForm from './StudioLeadForm';
import StudioContact from './StudioContact';
import StudioState from './StudioState';
import StudioSymbol from './StudioSymbol';
import PanelHeading from './PanelHeading';
import StudioChat from './Chat/StudioChat';
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
  CHAT: 'chat',
};

const FLOW_SCREENS = {
  idea: STUDIO_SCREENS.IDEA,
  web: STUDIO_SCREENS.WEB,
  collab: STUDIO_SCREENS.COLLAB,
};

const screenHeader = {
  [STUDIO_SCREENS.HOME]: studioCopy.header,
  [STUDIO_SCREENS.AREAS]: { title: 'Areas de trabajo', subtitle: 'Lineas principales' },
  [STUDIO_SCREENS.IDEA]: { title: 'Ordenemos tu idea', subtitle: 'Preguntas breves' },
  [STUDIO_SCREENS.WEB]: { title: 'Pagina web', subtitle: 'Solicitud guiada' },
  [STUDIO_SCREENS.COLLAB]: { title: 'Colaboremos', subtitle: 'Propuestas y networking' },
  [STUDIO_SCREENS.NEXT]: { title: 'Siguiente paso', subtitle: 'Enviar o revisar' },
  [STUDIO_SCREENS.LEAD]: { title: 'Envia una consulta', subtitle: 'Cuentame tu idea' },
  [STUDIO_SCREENS.ATTACHMENT]: { title: 'Archivos', subtitle: 'Paso opcional' },
  [STUDIO_SCREENS.CONTACT]: { title: 'Contacto', subtitle: 'Respuesta por correo' },
  [STUDIO_SCREENS.SUCCESS]: { title: 'Solicitud enviada', subtitle: 'Confirmacion' },
  [STUDIO_SCREENS.ERROR]: { title: 'No se pudo enviar', subtitle: 'Intenta otra vez' },
  [STUDIO_SCREENS.CHAT]: { title: 'Chat de Estudio', subtitle: 'Salas en tiempo real' },
};

const initialLead = {
  name: '',
  message: '',
  email: '',
  attachment: null,
};

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

function StudioNextStep({ onProjectsClick, onLead }) {
  return (
    <div className="studio-open__screen">
      <div className="studio-open__next-step">
        <span className="studio-open__state-icon"><StudioSymbol name="sparkles" /></span>
        <h2>{studioCopy.next.title}</h2>
        <p>{studioCopy.next.main}</p>
        <p>{studioCopy.next.secondary}</p>
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

export default function StudioOpen() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState(STUDIO_SCREENS.HOME);
  const [, setScreenHistory] = useState([]);
  const [flow, setFlow] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [lead, setLead] = useState(initialLead);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [chatUnreadCount, setChatUnreadCount] = useState(0);
  const bodyRef = useRef(null);
  const handleChatNotification = useCallback(() => {
    setChatUnreadCount((currentCount) => currentCount + 1);
  }, []);
  const chat = useStudioChatController({
    isPanelOpen: isOpen,
    onNotification: handleChatNotification,
  });

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
    setChatUnreadCount(0);
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

  function handleProjectsClick() {
    const target = document.querySelector('#proyectos');
    if (!target) return;

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
    } catch {
      setSubmitStatus('error');
      goToScreen(STUDIO_SCREENS.ERROR);
    }
  }

  function reviewFailedSubmission() {
    setSubmitStatus('idle');
    goToScreen(STUDIO_SCREENS.CONTACT);
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
            <StudioHome
              onSelectFlow={selectFlow}
              onProjectsClick={handleProjectsClick}
              onChatClick={() => goToScreen(STUDIO_SCREENS.CHAT)}
            />
          ) : null}

          {screen === STUDIO_SCREENS.CHAT ? (
            <StudioChat chat={chat} />
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
              primaryActionLabel="Revisar envio"
              secondaryActionLabel="Volver al inicio"
              onPrimaryAction={reviewFailedSubmission}
              onSecondaryAction={resetStudio}
            />
          ) : null}
        </div>
      </section>

      <StudioLauncher
        isOpen={isOpen}
        unreadCount={chatUnreadCount}
        onToggle={isOpen ? closeStudio : openStudio}
      />
    </div>
  );
}
