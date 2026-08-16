# Saigely Authentication Architecture

## Purpose

Document browser sessions and service-to-service authentication.

# Technology Baseline

Better Auth stores users, sessions, accounts, verification records, and JWKS keys in Neon/Postgres. GitHub and Google are configured as social providers.

# Session Authentication

Browser requests use the Better Auth session cookie. Server code resolves the session from request headers and exposes the authenticated user through the GraphQL context.

# JWT Authentication

The browser requests a short-lived token before opening the WebSocket. The current contract is:

```text
algorithm: RS256
issuer:    saigely-next
audience:  saigely-websocket
lifetime:  5 minutes
JWKS:      /api/auth/jwks
```

The gateway verifies the token and sends it as a bearer token when calling GraphQL. The application verifies issuer, audience, algorithm, and a non-empty subject.

# Ownership Rules

Conversation reads, appends, summaries, and deletes are scoped to the authenticated user. A valid MongoDB ObjectId is not sufficient authorization.

# Security Expectations

- Keep OAuth secrets, database URLs, and signing keys out of source control.
- Rotate the Better Auth secret and provider credentials through hosting configuration.
- Keep the JWT lifetime short and refresh the socket before expiration.
- Treat authentication errors and interrupted streams as user-visible failures, not successful turns.

