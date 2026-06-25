export function sortMessagesByDate(messages = []) {
  return [...messages].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export function paginateMessages(messages = [], { limit = 20, before } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);
  const sortedMessages = sortMessagesByDate(messages);
  const filteredMessages = before
    ? sortedMessages.filter((message) => new Date(message.createdAt).getTime() < new Date(before).getTime())
    : sortedMessages;
  const pageWithExtra = filteredMessages.slice(-(safeLimit + 1));
  const hasMore = pageWithExtra.length > safeLimit;
  const page = hasMore ? pageWithExtra.slice(1) : pageWithExtra;

  return { messages: page, hasMore };
}
