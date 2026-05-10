import {
  getConversation,
  getUserConversationList,
} from "@/server/services/conversationService";

export const conversationResolvers = {
  Query: {
    conversation: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      const conversation = await getConversation(args.conversationId);

      if (!conversation) {
        return null;
      }

      return {
        ...conversation,
        id: conversation._id.toString(),
      };
    },

    conversations: async (_, __, context) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return getUserConversationList(context.user.id);
    },
  },
};
