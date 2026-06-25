import PanelHeading from './PanelHeading';
import StudioSymbol from './StudioSymbol';

export default function StudioFlowScreen({ title, description, icon, questions, selectedOptions, onSelectOption, onNext }) {
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
