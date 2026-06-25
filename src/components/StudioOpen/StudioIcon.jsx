export default function StudioIcon({ name }) {
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
