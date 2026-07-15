"use client";

import { ScrollArea } from "radix-ui";

import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble";
import ChatComposer from "./ChatComposer";

export const ChatClient = ({ messages, handleSendMessage, chatStatus }) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <MessageList>
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
                attachments={message.attachments}
                status={chatStatus}
                isActive={
                  message.role === "assistant" &&
                  index === messages.length - 1
                }
              />
            ))}
          </MessageList>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
      <ChatComposer
        onSendMessage={handleSendMessage}
        status={chatStatus}
      />
    </div>
  );
};
