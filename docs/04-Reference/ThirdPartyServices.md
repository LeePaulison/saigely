# Saigely Third-Party Services Reference

## Purpose

Record external services used by the current MVP.

| Service | Use |
| --- | --- |
| Vercel | Next.js hosting and production web origin |
| Fly.io | OpenAI WebSocket Gateway hosting |
| Neon | Serverless Postgres |
| MongoDB | Conversation storage |
| OpenAI | Responses API streaming |
| Better Auth | Application authentication and JWKS |
| GitHub | OAuth provider |
| Google | OAuth provider |

# Integration Rules

Provider credentials belong in hosting secret stores. Public URLs, issuer/audience values, OAuth callbacks, and JWKS reachability form one coordinated integration contract. Use [operations.md](../operations.md) before changing production topology.

# Gateway Reference

The gateway is a shared service with application-specific configuration. Its protocol, timeout, payload, rate-limit, readiness, and logging behavior are documented in the gateway repository README; this repository records only Saigely’s values and GraphQL shapes.

