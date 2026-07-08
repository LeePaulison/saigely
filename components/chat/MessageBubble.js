import { MarkdownRenderer } from "../markdown/MarkdownRenderer";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[90%] text-foreground rounded-lg px-4 py-3 ${
        isUser ? "ml-auto bg-message-user" : "mr-auto bg-message"
      }`}
    >
      <MarkdownRenderer content={content} />
    </div>
  );
}
