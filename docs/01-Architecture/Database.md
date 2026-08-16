# Saigely Database Architecture

## Purpose

Explain which store owns which data.

# Data Store Summary

| Store | Data | Access layer |
| --- | --- | --- |
| Neon Postgres | Better Auth, preferences, models, agents, reasoning and verbosity levels | Drizzle repositories |
| MongoDB database `saigely` | Conversations and embedded messages | MongoDB repository |

# PostgreSQL

Postgres is the source of truth for identity and structured configuration. Reference tables are read by GraphQL and selected by the settings UI. User preferences use `user_id` as their primary key.

# MongoDB

The `conversations` collection stores one document per conversation with `userId`, `createdAt`, `updatedAt`, and a `messages` array. The first message is projected for the sidebar preview.

# Data Ownership Rules

- Do not expose database clients to browser code.
- Keep conversation ownership in every query that returns or mutates user data.
- Validate ObjectIds before querying MongoDB.
- Keep AI configuration descriptions and prompts in Postgres rather than duplicating them in components.

