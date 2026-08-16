# Saigely Architecture

## Purpose

Describe the current runtime and ownership boundaries.

# Architectural Summary

```text
Browser
  | HTTPS: Next.js, Better Auth, GraphQL
  | WSS: authenticated chat stream
  v
Next.js on Vercel --------------------> Neon Postgres
  | GraphQL, auth, UI, repositories       auth/configuration
  v
MongoDB conversations

Browser ---> OpenAI WebSocket Gateway on Fly.io ---> OpenAI Responses API
                 |
                 +--> authenticated GraphQL calls to Next.js
```

# Component Ownership

| Component | Owns |
| --- | --- |
| Next.js | Routes, protected UI, Better Auth, GraphQL, request security, persistence orchestration |
| WebSocket Gateway | Socket lifecycle, JWT verification, OpenAI streaming, gateway-to-GraphQL calls |
| Neon Postgres | Auth tables and AI configuration/preferences |
| MongoDB | Conversation documents and messages |
| Browser stores | Hydrated UI preferences and conversation presentation state |

# Core Boundary

The browser never writes directly to either database. GraphQL is the application boundary for reads and durable writes; the gateway uses the same authenticated boundary when it saves completed turns.

