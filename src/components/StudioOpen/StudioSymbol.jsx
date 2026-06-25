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

export default function StudioSymbol({ name }) {
  return (
    <span className="studio-open__symbol" aria-hidden="true">
      {studioSymbols[name] || '✦'}
    </span>
  );
}
