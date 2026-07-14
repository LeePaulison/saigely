import {
  appendMessages,
  createConversation,
  getUserConversations,
  getConversationById,
} from "../../repositories/conversationRepository.js";

export const conversationResolvers = {
  Query: {
    conversations: async (_, __, context) => {
      if (!context.authenticated) {
        return [];
      }

      return getUserConversations(context.user.id);
    },

    conversation: async (_, { id }, context) => {
      if (!context.authenticated) {
        return null;
      }

      const conversation = await getConversationById(id);

      if (!conversation) {
        return null;
      }

      if (conversation.userId !== context.user.id) {
        return null;
      }

      return conversation;
    },
  },

  Mutation: {
    saveConversationTurn: async (_, { input }, context) => {
      if (!context.authenticated) {
        throw new Error("Unauthorized");
      }

      const now = new Date();
      const messages = [
        { role: "user", content: input.userMessage, createdAt: now },
        { role: "assistant", content: input.assistantMessage, createdAt: now },
      ];

      if (!input.conversationId) {
        return createConversation({ userId: context.user.id, messages });
      }

      const conversation = await getConversationById(input.conversationId);

      if (!conversation || conversation.userId !== context.user.id) {
        throw new Error("Conversation not found");
      }

      return appendMessages({
        conversationId: input.conversationId,
        messages,
      });
    },
  },

  ConversationSummary: {
    id: (conversation) => conversation._id.toString(),

    updatedAt: (conversation) => conversation.updatedAt.toISOString(),

    preview: (conversation) => conversation.messages?.[0]?.content ?? null,
  },

  Conversation: {
    id: (conversation) => conversation._id.toString(),

    createdAt: (conversation) => conversation.createdAt.toISOString(),

    updatedAt: (conversation) => conversation.updatedAt.toISOString(),
  },

  Message: {
    createdAt: (message) =>
      message.createdAt instanceof Date
        ? message.createdAt.toISOString()
        : message.createdAt,
  },
};
