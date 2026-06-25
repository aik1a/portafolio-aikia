import StudioSymbol from './StudioSymbol';

export default function PanelHeading({ icon, title, description }) {
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
