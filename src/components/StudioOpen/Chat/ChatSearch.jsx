export default function ChatSearch({ searchQuery, onSearchChange }) {
  return (
    <div className="studio-open__chat-search">
      <div className="studio-open__chat-search-wrapper">
        <input
          type="text"
          className="studio-open__text-field studio-open__chat-search-input"
          placeholder="Buscar por texto o alias..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        {searchQuery ? (
          <button
            type="button"
            className="studio-open__chat-search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Limpiar busqueda"
          >
            ×
          </button>
        ) : (
          <span className="studio-open__chat-search-icon">🔍</span>
        )}
      </div>
    </div>
  );
}
