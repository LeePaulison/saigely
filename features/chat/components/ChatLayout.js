export default function ChatLayout({ children }) {
  return (
    <main className="flex h-screen flex-col bg-background text-foreground">
      {children}
    </main>
  );
}
