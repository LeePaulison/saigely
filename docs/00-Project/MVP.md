# Saigely MVP

## Purpose

Define the smallest complete product shipped by this repository.

# MVP Thesis

Saigely is complete when an authenticated user can configure an assistant, exchange streamed messages, persist the conversation, and safely return to it.

# Target User

An individual user evaluating a personal AI assistant experience and its engineering quality.

# Product Scope

## Included

- GitHub and Google sign-in through Better Auth.
- Protected chat experience with responsive layout and themes.
- Model, agent, reasoning, verbosity, temperature, and theme preferences.
- OpenAI response streaming through the separate WebSocket Gateway.
- Conversation summaries, full conversation reads, turn persistence, and deletion.
- Markdown, tables, syntax-highlighted code, and text-file attachments.
- Request validation, rate limiting, security headers, ownership checks, and bounded reconnect behavior.

## Excluded

- Native mobile clients, teams, billing, quotas, analytics dashboards, image/audio attachments, and user-created agents.

# Completion Criteria

The app builds, lint passes, tests cover the security and persistence seams, production services can authenticate one another, and a user can complete the core loop without manual database work.

