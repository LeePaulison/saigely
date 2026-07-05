import { MarkdownRenderer } from "../markdown/MarkdownRenderer";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[80%] rounded-lg px-4 py-3 ${
        isUser
          ? "ml-auto bg-message-user text-slate-50"
          : "mr-auto bg-message text-slate-50"
      }`}
    >
      <MarkdownRenderer content={content} />
    </div>
  );
}
