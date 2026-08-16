# Saigely GraphQL Architecture

## Purpose

Document the GraphQL boundary used by the browser and gateway.

# Technology Baseline

GraphQL Yoga serves the route; GraphQL Tools loads and merges SDL files. Resolvers delegate to repository and domain helpers.

# Request Handling

The route accepts JSON POST requests, rejects invalid content types and oversized bodies, and rejects GET in production. Responses receive a request ID and non-cacheable security headers.

# Authentication Context

`createContext` first checks the Better Auth session. It can also validate a bearer JWT against the application JWKS for gateway requests. Resolvers use the resulting authenticated user and request ID.

# Current Root Operations

Queries expose conversations, preferences, AI models, AI agents, reasoning levels, and verbosity levels. Mutations save conversation turns, delete conversations, and update preferences.

# Resolver Pattern

Resolvers should remain thin: authenticate, validate input, call the relevant repository, and map the result to the SDL. New user-owned operations must include ownership in the repository query or mutation.

