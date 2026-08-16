# Saigely Roadmap

## Roadmap Purpose

The roadmap describes sensible follow-on work without implying that it is part of the current MVP.

# Completed: MVP Foundation

- Authenticated Next.js shell and protected chat route.
- GraphQL API with session and JWT request contexts.
- Neon/Postgres configuration and Better Auth persistence.
- MongoDB conversation persistence with user ownership checks.
- WebSocket streaming integration and bounded reconnect behavior.
- Markdown rendering, text attachments, themes, and settings.
- Production runbook and focused automated tests.

# Next Review Slice

Before adding features, review service-local correlation IDs, gateway protocol documentation, database indexes, and deployment secret rotation.

# Possible Future Slices

1. Conversation search, pinning, and export.
2. Safer durable attachment storage with content-type and size policy.
3. Provider/model administration rather than seeded configuration only.
4. Usage visibility and per-user limits.
5. Tool calling or task workflows with explicit consent and auditability.

# Roadmap Principles

Build vertical slices, keep ownership filters in every new resolver, and update the reference docs with every contract or environment change.

