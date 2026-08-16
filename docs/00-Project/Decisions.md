# Saigely Decisions

## Purpose

This file records durable choices that shape the MVP.

## Decision Index

| ID | Decision |
| --- | --- |
| SAI-0001 | Keep the web app and streaming gateway as separate services |
| SAI-0002 | Use Postgres for relational/configuration data and MongoDB for conversations |
| SAI-0003 | Use short-lived RS256 JWTs at the WebSocket and service boundary |
| SAI-0004 | Treat text attachments as a bounded message payload |

## SAI-0001: Separate the streaming gateway

**Status:** Accepted

The Next.js application owns web requests and durable application data; a separate Node.js gateway owns WebSocket connections and OpenAI streaming. This keeps long-lived socket behavior out of the web request lifecycle.

## SAI-0002: Use two data stores

**Status:** Accepted

Neon/Postgres fits Better Auth and structured configuration tables. MongoDB fits append-oriented conversation documents and message arrays. The split is intentionally scoped to the MVP and should not expand casually.

## SAI-0003: Use short-lived service JWTs

**Status:** Accepted

The browser obtains a five-minute RS256 JWT from Better Auth. The gateway verifies issuer, audience, algorithm, and subject against the application JWKS before using the token for GraphQL calls.

## SAI-0004: Encode text attachments in the chat message

**Status:** Accepted

Text files are serialized into a bounded, marked payload so the gateway can pass their contents through the existing chat path without introducing a separate storage system.

