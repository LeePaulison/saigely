"use client";

import { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export default function ChatInput({ onSendMessage }) {
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

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4">
      <div className="mx-auto flex max-w-4xl gap-2">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Send a message..."
          className="flex-1 rounded-md border border-mist-700 bg-input px-4 py-2 text-slate-50 outline-none placeholder:text-input-placeholder"
        />

        <button
          type="submit"
          className="flex items-center gap-3 rounded-md bg-send px-4 py-2 text-slate-50"
        >
          Send
          <PaperPlaneIcon />
        </button>
      </div>
    </form>
  );
}
