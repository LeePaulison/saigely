# Saigely

Saigely is the Next.js frontend for a full-stack AI platform. It communicates with a standalone backend over GraphQL and authenticated WebSockets to provide real-time AI conversations, persistent chat history, and user preferences.

Rather than being a simple chatbot, the project focuses on delivering a modern AI experience while demonstrating clean frontend architecture and integration with a dedicated backend API.

---

# Features

- 🤖 Real-time AI conversations using the OpenAI Responses API
- ⚡ Token streaming over authenticated WebSockets
- 💬 Persistent conversation history
- 🔐 GitHub and Google OAuth authentication
- 👤 Persistent user preferences
- 📡 GraphQL API integration
- 🎨 Modern UI built with Next.js, Tailwind CSS, and Radix UI
- 🌙 Light and dark themes
- 🧩 Clean, component-driven frontend architecture

---

# Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Radix UI
- Zustand

## Backend (External API)

- Node.js
- Express
- GraphQL Yoga
- Better Auth
- WebSocket server (`ws`)

## AI

- OpenAI Responses API
- Real-time streaming responses

## Data

### SQLite

Stores:

- Authentication
- User preferences
- AI models
- AI agents
- Reasoning levels
- Verbosity levels

### MongoDB

Stores:

- Conversations
- Messages

---

# Architecture

```text
                  Browser
                     │
                     ▼
             Next.js Frontend
                     │
      ┌──────────────┴──────────────┐
      │                             │
  GraphQL API                   WebSocket
      │                             │
      └──────────────┬──────────────┘
                     │
                Saigely API
                     │
      ┌──────────────┼──────────────┐
      │              │              │
 Better Auth     OpenAI API    Repositories
      │                             │
      ├──────── SQLite              │
      └──────── MongoDB─────────────┘
```

---

# Frontend Structure

```text
app/
components/
features/
hooks/
lib/
providers/
public/
store/
```

---

# Backend Integration

The frontend communicates with a standalone API server that follows a layered architecture.

```text
  GraphQL / WebSocket
          │
          ▼
     Service Layer
          │
          ▼
   Repository Layer
          │
          ▼
   SQLite / MongoDB
```

Responsibilities:

- **GraphQL** exposes application data.
- **WebSockets** provide real-time AI streaming.
- **Services** implement business logic.
- **Repositories** isolate data access.
- **SQLite** stores authentication and application configuration.
- **MongoDB** stores conversations and messages.

---

# Authentication

Authentication is handled by Better Auth using OAuth providers.

Supported providers:

- GitHub
- Google

User sessions are shared across:

- Next.js
- GraphQL
- WebSocket connections

allowing authenticated, real-time AI conversations.

---

# AI Streaming

Messages are streamed from the OpenAI Responses API through the external backend.

```text
Browser
    │
WebSocket
    │
Saigely API
    │
OpenAI Responses API
    │
stream
    ▼
Browser
```

Conversation history is automatically persisted after each completed response.

---

# Preferences

Each authenticated user has persistent preferences stored by the backend.

Current preferences include:

- Theme
- Default AI model
- Default AI agent
- Temperature
- Reasoning level
- Verbosity level

These preferences are loaded during chat initialization and applied to future AI requests.

---

# Getting Started

## Prerequisites

- Node.js 20+
- A running Saigely API server
- MongoDB
- OpenAI API key
- GitHub OAuth application (optional)
- Google OAuth application (optional)

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000/ws
```

> Additional environment variables required by the backend are configured in the Saigely API project.

---

## Development

Start the frontend:

```bash
npm run dev
```

The frontend expects the Saigely API server to be running separately and communicates with it through GraphQL and authenticated WebSocket connections.

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

---

# Related Projects

- **Saigely Frontend** (this repository)
- **Saigely API** — Express, GraphQL, Better Auth, WebSockets, SQLite, MongoDB, and OpenAI integration.

---

# Purpose

Saigely was built as a portfolio project to demonstrate:

- Modern React architecture
- Next.js App Router
- GraphQL integration
- Real-time WebSocket communication
- AI application development
- State management with Zustand
- Authentication workflows
- Integration with a layered backend architecture

The project emphasizes maintainability, modularity, and modern frontend engineering practices rather than serving as a production SaaS application.

---

# License

This project is currently not licensed for public use.
