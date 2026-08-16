# Saigely Environment Reference

## Purpose

List the environment contract without recording secret values.

# Web Application Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Yes | Better Auth secret |
| `BETTER_AUTH_URL` | Yes | Canonical app URL and JWKS origin |
| `NEXT_PUBLIC_AUTH_URL` | Yes | Browser auth URL |
| `DATABASE_URL` | Yes | Neon/Postgres connection |
| `MONGODB_URI` | Yes | MongoDB connection |
| `NEXT_PUBLIC_WS_SERVER` | Yes | Browser WebSocket URL |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Provider-dependent | GitHub OAuth |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Provider-dependent | Google OAuth |
| `GRAPHQL_MAX_BODY_BYTES` | No | GraphQL body limit; default documented in code/runbook |
| `GRAPHQL_REQUESTS_PER_MINUTE` | No | Process-local GraphQL rate limit |

# Gateway Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | Yes | OpenAI access |
| `API_ORIGIN` | Yes | Application GraphQL origin |
| `CLIENT_ORIGIN` | Yes | Exact allowed browser origin |
| `JWKS_URL` | Yes | Better Auth public key endpoint |
| `JWT_ISSUER` | Yes | `saigely-next` |
| `JWT_AUDIENCE` | Yes | `saigely-websocket` |
| `JWT_ALGORITHMS` | No | Algorithm allowlist, default `RS256` |
| `CORS_ORIGIN` | No | HTTP CORS origin |
| Runtime limits/timeouts | No | Gateway README defaults for payloads, rate, heartbeat, readiness, and stream idle timeout |

Local callbacks use `http://localhost:3000/api/auth/callback/{github|google}`. Never use localhost values in hosted gateway configuration.

