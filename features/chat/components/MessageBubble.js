export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[80%] rounded-lg px-4 py-3 ${
        isUser
          ? "ml-auto bg-emerald-600 text-white"
          : "mr-auto bg-mist-800 text-white"
      }`}
    >
      {content}
    </div>
  );
}
