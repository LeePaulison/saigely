"use client";

import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-4">
      <div className="mx-auto flex max-w-4xl gap-2">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Send a message..."
          className="flex-1 rounded-md border border-mist-700 bg-mist-900 px-4 py-2 text-white outline-none"
        />

        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-4 py-2 text-white"
        >
          Send
        </button>
      </div>
    </form>
  );
}
