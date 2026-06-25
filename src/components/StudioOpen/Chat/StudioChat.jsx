import PanelHeading from '../PanelHeading';
import ChatAliasForm from './ChatAliasForm';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';
import ChatRoomSelector from './ChatRoomSelector';
import ChatSearch from './ChatSearch';

export default function StudioChat({ chat }) {
  if (!chat.alias) {
    return <ChatAliasForm onSaveAlias={chat.onSaveAlias} />;
  }

  return (
    <div className="studio-open__screen studio-open__chat-screen">
      <PanelHeading
        icon="sparkles"
        title="Chat de Estudio"
        description={`Interactua en tiempo real en la sala activa como @${chat.alias}`}
      />

      {chat.socketError ? (
        <div className="studio-open__chat-status" role="status">
          <span>{chat.socketError}</span>
          <button
            className="studio-open__chat-retry"
            type="button"
            onClick={chat.onRetryConnection}
          >
            Reintentar conexión
          </button>
        </div>
      ) : null}

      <div className="studio-open__chat-room-container">
        <ChatRoomSelector
          activeRoomId={chat.activeRoomId}
          unreadRooms={chat.unreadRooms}
          onSelectRoom={chat.onSelectRoom}
        />
      </div>

      <div className="studio-open__chat-search-container">
        <ChatSearch searchQuery={chat.searchQuery} onSearchChange={chat.setSearchQuery} />
      </div>

      <ChatMessageList
        messages={chat.filteredMessages}
        currentUserAlias={chat.alias}
        onLoadMore={chat.onLoadMore}
        isLoadingMore={chat.isLoadingMore}
        hasMore={chat.hasMore}
        emptyText={chat.hasSearch ? 'No hay resultados en esta sala.' : undefined}
      />

      <ChatMessageInput
        onSendMessage={chat.onSendMessage}
        onUploadFile={chat.onUploadFile}
        isMuted={chat.isMuted}
        onToggleSound={chat.onToggleSound}
      />
    </div>
  );
}
