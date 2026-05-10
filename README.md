# Saigely

Saigely is a real-time AI chat application powered by OpenAI. It streams responses over WebSockets and persists conversations in MongoDB.

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router)
- **Server** — Custom Node.js HTTP server (`server/server.js`) combining Next.js and WebSocket handling on a single port
- **AI** — [OpenAI API](https://platform.openai.com) (GPT-4.1-mini, streaming completions)
- **Real-time** — [ws](https://github.com/websockets/ws) WebSocket server with authenticated upgrade
- **Auth** — [Better Auth](https://www.better-auth.com) with GitHub and Google OAuth
- **Auth DB** — SQLite (via better-sqlite3)
- **Chat DB** — MongoDB for conversation persistence
- **API** — [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) endpoint at `/api/graphql`
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com)

## Prerequisites

- [Node.js](https://nodejs.org) >= 18
- A running [MongoDB](https://www.mongodb.com) instance (local or Atlas)
- An [OpenAI API key](https://platform.openai.com/api-keys)
- OAuth credentials for [GitHub](https://github.com/settings/developers) and/or [Google](https://console.cloud.google.com/apis/credentials)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# MongoDB
MONGODB_URI=mongodb://localhost:27017

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Run the development server

```bash
npm run dev
```

This starts the custom server with [nodemon](https://nodemon.io) on [http://localhost:3000](http://localhost:3000). The server handles both Next.js page requests and WebSocket connections on the `/ws` path.

> To run only the Next.js dev server (without WebSocket support): `npm run next:dev`

## Project Structure

```
app/
  layout.js              # Root layout (Geist font, Tailwind)
  page.js                # Landing page with login link
  login/page.js          # GitHub / Google OAuth login
  (protected)/           # Auth-gated route group
    layout.js            # Session check — redirects to /login if unauthenticated
    chat/page.js         # Chat page
  api/
    auth/[...all]/route.js   # Better Auth API routes
    graphql/route.js         # GraphQL Yoga endpoint
features/
  chat/components/       # ChatClient, ChatInput, ChatLayout, MessageBubble, MessageList
lib/
  auth/                  # Better Auth server & client configuration
  db/
    sqlite.js            # SQLite connection (auth data)
    mongo.js             # MongoDB connection (conversations)
  openai/
    client.js            # OpenAI client
    chat.js              # Streaming chat completion helper
server/
  server.js              # Custom HTTP server (Next.js + WebSocket)
  websocket.js           # WebSocket message handling & OpenAI streaming
  services/              # Conversation business logic
  repositories/          # MongoDB data access (conversations collection)
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the custom server with nodemon (Next.js + WebSocket) |
| `npm run next:dev` | Start Next.js dev server only |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

This project is not currently licensed for public use.
