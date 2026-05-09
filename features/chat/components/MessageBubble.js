export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[80%] rounded-lg px-4 py-3 ${
        isUser
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-zinc-800 text-white"
      }`}
    >
      {content}
    </div>
  );
}
