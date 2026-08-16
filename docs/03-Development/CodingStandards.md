# Saigely Coding Standards

## Purpose

Keep the MVP understandable while preserving its service boundaries.

# General Principles

- Prefer small modules with one ownership responsibility.
- Keep validation at the boundary and authorization in the data operation.
- Use existing repository and GraphQL patterns before introducing abstractions.
- Make failure states explicit in UI and transport code.

# JavaScript and React

Use the repository’s ES module style, clear named functions, and App Router server/client boundaries. Add `"use client"` only where browser state or effects require it.

# Repositories

Repositories own database calls and return application-shaped results. Validate IDs before querying and include `userId` in owned operations.

# GraphQL

Keep SDL in `graphql/schemas`, resolver wiring in `graphql/resolvers`, and domain/repository calls outside resolver bodies where practical.

# Environment Variables

Read required variables at the boundary that needs them, fail clearly when missing, and document every variable in [Environment.md](../04-Reference/Environment.md).

