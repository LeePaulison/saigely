"use client";

import { useConversationsStore } from "@/store/stores/conversationsStore";

export const ConversationSidebar = ({
  activeConversationId,
  onSelectConversation,
}) => {
  const conversations = useConversationsStore((state) => state.conversations);

  console.log("ConversationSidebar - conversations: ", conversations);

  if (!conversations) return null;

  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  function formatRelative(updatedAt, now) {
    const date = new Date(updatedAt);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const diff = date.getTime() - now.getTime();
    const minutes = Math.round(diff / 60000);

    if (Math.abs(minutes) < 60) {
      return formatter.format(minutes, "minute");
    }

    const hours = Math.round(minutes / 60);
    if (Math.abs(hours) < 24) {
      return formatter.format(hours, "hour");
    }

    const days = Math.round(hours / 24);
    return formatter.format(days, "day");
  }

  const now = new Date();

  return (
    <aside className="flex w-80 flex-col border-r border-border">
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeConversationId;
          console.log("isActive: ", isActive);
          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`relative flex flex-col border-b border-sidebar-active p-4 text-left transition-colors hover:bg-sidebar-hover ${
                isActive
                  ? "bg-sidebar-active after:absolute after:inset-y-0 after:right-0 after:w-6 after:bg-linear-to-l after:from-black/20 after:to-transparent after:content-['']"
                  : ""
              }`}
            >
              {" "}
              <span className="truncate text-sm font-medium">
                {conversation.preview}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {formatRelative(conversation.updatedAt, now)}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
