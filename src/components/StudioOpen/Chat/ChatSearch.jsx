export default function ChatSearch({ searchQuery, onSearchChange }) {
  return (
    <div
      className="studio-open__chat-search"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%',
        marginBottom: '10px',
      }}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          className="studio-open__text-field"
          style={{
            width: '100%',
            height: '32px',
            padding: '4px 28px 4px 10px',
            fontSize: '12px',
            borderRadius: '12px',
            border: '1px solid rgba(22, 20, 17, 0.1)',
            background: 'rgba(255, 251, 242, 0.6)',
          }}
          placeholder="Buscar por texto o alias..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '6px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--studio-open-muted)',
              fontSize: '13px',
              padding: '2px 4px',
            }}
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        ) : (
          <span
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontSize: '11px',
            }}
          >
            🔍
          </span>
        )}
      </div>
    </div>
  );
}
