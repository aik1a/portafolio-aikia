import { useState } from 'react';
import ChatAliasForm from './ChatAliasForm';
import ChatRoomSelector from './ChatRoomSelector';
import ChatSearch from './ChatSearch';
import ChatMessageList from './ChatMessageList';
import ChatMessageInput from './ChatMessageInput';
import PanelHeading from '../PanelHeading';

const INITIAL_MESSAGES = [
  {
    id: 'sys-proyectos',
    room: 'proyectos',
    user: 'system',
    text: 'Te has unido a la sala #Proyectos.',
    createdAt: new Date(Date.now() - 1000000).toISOString(),
  },
  {
    id: 'msg-proyectos-1',
    room: 'proyectos',
    user: 'Diego',
    text: 'Hola, ¿alguien por aquí trabajando en portafolios interactivos con React y Tailwind?',
    createdAt: new Date(Date.now() - 500000).toISOString(),
  },
  {
    id: 'sys-producto',
    room: 'producto-ux',
    user: 'system',
    text: 'Te has unido a la sala #Producto y UX.',
    createdAt: new Date(Date.now() - 1000000).toISOString(),
  },
  {
    id: 'msg-producto-1',
    room: 'producto-ux',
    user: 'Valeria',
    text: '¡Hola! Me gusta mucho la paleta de colores crema y rosa que usaste en este sitio.',
    createdAt: new Date(Date.now() - 400000).toISOString(),
  },
  {
    id: 'sys-ia',
    room: 'ia-aplicada',
    user: 'system',
    text: 'Te has unido a la sala #IA aplicada.',
    createdAt: new Date(Date.now() - 1000000).toISOString(),
  },
  {
    id: 'msg-ia-1',
    room: 'ia-aplicada',
    user: 'Carlos',
    text: '¿Qué opinan de integrar APIs de modelos de lenguaje directamente en el frontend?',
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
];

export default function StudioChat() {
  const [alias, setAlias] = useState('');
  const [activeRoomId, setActiveRoomId] = useState('proyectos');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const handleSendMessage = (text) => {
    // Sanitizar entrada básica (remover etiquetas HTML agresivas)
    const sanitizedText = text.replace(/<[^>]*>/g, '');
    const newMessage = {
      id: `msg-${Date.now()}`,
      room: activeRoomId,
      user: alias,
      text: sanitizedText,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSelectRoom = (roomId) => {
    setActiveRoomId(roomId);
    setSearchQuery(''); // Limpiar búsqueda al cambiar de sala

    // Agregar un mensaje de sistema al cambiar de sala en la sesión local
    const systemMsg = {
      id: `sys-${Date.now()}`,
      room: roomId,
      user: 'system',
      text: `Te cambiaste a la sala #${roomId.toUpperCase()}.`,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, systemMsg]);
  };

  if (!alias) {
    return <ChatAliasForm onSaveAlias={setAlias} />;
  }

  // Filtrar los mensajes de la sala activa por la query de búsqueda
  const filteredMessages = messages.filter((msg) => {
    if (msg.room !== activeRoomId) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      msg.text.toLowerCase().includes(query) ||
      msg.user.toLowerCase().includes(query)
    );
  });

  return (
    <div className="studio-open__screen" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PanelHeading
        icon="sparkles"
        title="Chat de Estudio"
        description={`Interactúa en tiempo real en la sala activa como @${alias}`}
      />

      <div style={{ marginTop: '10px' }}>
        <ChatRoomSelector activeRoomId={activeRoomId} onSelectRoom={handleSelectRoom} />
      </div>

      <div style={{ marginTop: '12px' }}>
        <ChatSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      <ChatMessageList messages={filteredMessages} currentUserAlias={alias} />

      <ChatMessageInput
        onSendMessage={handleSendMessage}
        isMuted={isMuted}
        onToggleSound={() => setIsMuted(!isMuted)}
      />
    </div>
  );
}
