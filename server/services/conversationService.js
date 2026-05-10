import {
  appendMessages,
  createConversation,
} from "../repositories/conversationRepository.js";

export async function saveConversationTurn({
  conversationId,
  userId,
  userMessage,
  assistantMessage,
}) {
  const messages = [
    {
      role: "user",
      content: userMessage,
      createdAt: new Date(),
    },
    {
      role: "assistant",
      content: assistantMessage,
      createdAt: new Date(),
    },
  ];

  if (!conversationId) {
    return createConversation({
      userId,
      messages,
    });
  }

  return appendMessages({
    conversationId,
    messages,
  });
}
