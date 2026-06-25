"use client";

import { useConversationsStore } from "@/store/stores/conversationsStore";

export const ConversationSidebar = ({
  activeConversationId,
  onSelectConversation,
}) => {
  const conversations = useConversationsStore((state) => state.conversations);

  console.log("ConversationSidebar - conversations: ", conversations);

  if (!conversations) return null;

  return (
    <aside className="flex w-80 flex-col border-r border-border bg-muted/30">
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeConversationId;

          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`flex flex-col border-b border-border p-4 text-left transition-colors hover:bg-accent ${
                isActive ? "bg-accent" : ""
              }`}
            >
              <span className="truncate text-sm font-medium">
                {conversation.preview}
              </span>

              <span className="mt-1 text-xs text-muted-foreground">
                {conversation.updatedAt}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
