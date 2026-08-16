# Saigely Database Schema Reference

## Purpose

Summarize the current database tables and conversation document.

# PostgreSQL Tables

## Better Auth tables

`user`, `session`, `account`, `verification`, and `jwks` are defined in `auth-schema.ts`. Sessions and accounts reference users with cascading deletion; JWKS stores the signing key pair used by the JWT plugin.

## `preferences`

Primary key: `user_id`. Stores theme, default model, temperature, reasoning level, verbosity level, agent, and timestamps.

## `ai_models`

Stores model ID, name, provider, description, enabled state, and capability flags for temperature, reasoning, verbosity, and streaming.

## `ai_agents`

Stores agent ID, category, display metadata, and system prompt.

## `reasoning_levels` and `verbosity_levels`

Reference tables containing ID, display name, description, enabled state, and timestamps.

# MongoDB

Database name: `saigely`. Collection: `conversations`.

```text
{
  _id: ObjectId,
  userId: string,
  createdAt: Date,
  updatedAt: Date,
  messages: [{ role: string, content: string, createdAt: Date }]
}
```

