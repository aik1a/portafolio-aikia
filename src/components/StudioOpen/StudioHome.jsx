import { studioCopy } from '../../data/studioCopy';
import { mainActions } from '../../data/studioOptions';
import StudioIcon from './StudioIcon';
import StudioSymbol from './StudioSymbol';

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

function ChatButton({ onClick }) {
  return (
    <button
      className="studio-open__projects-link"
      type="button"
      onClick={onClick}
      style={{
        marginTop: '8px',
        background: 'rgba(248, 195, 203, 0.18)',
        borderColor: 'rgba(248, 195, 203, 0.4)',
      }}
    >
      <span>
        <strong>Entrar al chat</strong>
        <span>Salas de conversación locales</span>
      </span>
      <StudioIcon name="chevron" />
    </button>
  );
}

export default function StudioHome({ onSelectFlow, onProjectsClick, onChatClick }) {
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

      <ChatButton onClick={onChatClick} />

      <ProjectsButton onClick={onProjectsClick} />
    </div>
  );
}
