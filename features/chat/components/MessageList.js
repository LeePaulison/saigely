export default function MessageList({ children }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
