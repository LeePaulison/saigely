"use client";

import { useState } from "react";
import { PaperPlaneIcon, FilePlusIcon } from "@radix-ui/react-icons";

export default function ChatComposer({ onSendMessage }) {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onSendMessage(trimmedMessage);

    setMessage("");
  }

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full border-t border-border p-4 pt-2"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
        <button type="button" className="flex items-center gap-3">
          <FilePlusIcon />
        </button>
        <button
          type="submit"
          className="flex items-center self-start gap-3 rounded-md bg-send px-4 py-2 text-slate-50"
        >
          Send
          <PaperPlaneIcon />
        </button>
      </div>
      <span className="text-xs text-foreground-muted">
        Ctrl (CMD) + Enter to Send
      </span>
      <div className="flex w-full gap-2 pt-2">
        <textarea
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="flex-1 rounded-md border border-mist-700 bg-input px-4 py-2 text-slate-50 outline-none placeholder:text-input-placeholder"
        />
      </div>
    </form>
  );
}
