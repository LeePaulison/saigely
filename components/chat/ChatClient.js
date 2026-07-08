"use client";

import { ScrollArea } from "radix-ui";

import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble";
import ChatComposer from "./ChatComposer";

export const ChatClient = ({ messages, handleSendMessage }) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <MessageList>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
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
      <ChatComposer onSendMessage={handleSendMessage} />
    </div>
  );
};
