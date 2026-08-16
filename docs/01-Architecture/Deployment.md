# Saigely Deployment Architecture

## Purpose

Document the current production topology and deployment dependencies.

# Current Topology

| Service | Host | Responsibility |
| --- | --- | --- |
| Next.js application | Vercel | UI, auth, GraphQL, data access |
| OpenAI WebSocket Gateway | Fly.io | WSS endpoint and streaming |
| Relational database | Neon | Auth and configuration |
| Conversation database | MongoDB | Conversation documents |

# Deployment Dependencies

The gateway needs the deployed Next.js origin for JWKS, GraphQL, and application readiness. The browser needs the public gateway WSS URL. Issuer, audience, and origins must match across both services.

# Deployment Order

Deploy gateway protocol/auth changes before a dependent client change. Deploy client-only UI changes independently. Use [operations.md](../operations.md) for checks, smoke tests, incident response, and rollback.

# Production Baseline

```text
BETTER_AUTH_URL=https://saigely.vercel.app
NEXT_PUBLIC_WS_SERVER=wss://saigely-server.fly.dev/ws
API_ORIGIN=https://saigely.vercel.app
CLIENT_ORIGIN=https://saigely.vercel.app
JWKS_URL=https://saigely.vercel.app/api/auth/jwks
```

