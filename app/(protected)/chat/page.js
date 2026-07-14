import ChatLayout from "@/components/chat/ChatLayout";

const mockConversations = [
  {
    id: "conversation-1",
    updatedAt: "2026-07-14T12:45:00.000Z",
    preview: "Planning the Next.js and WebSocket architecture",
  },
  {
    id: "conversation-2",
    updatedAt: "2026-07-13T19:20:00.000Z",
    preview: "Configuring Better Auth with Neon",
  },
  {
    id: "conversation-3",
    updatedAt: "2026-07-11T15:10:00.000Z",
    preview: "Designing persistent AI preferences",
  },
];

export default async function ChatPage() {
  return <ChatLayout conversations={mockConversations} />;
}
