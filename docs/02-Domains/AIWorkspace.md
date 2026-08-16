# AI Workspace Domain

## Purpose

Describe the primary chat workspace and its user-visible workflow.

# Domain Status

**Current MVP domain.** Implemented across the protected chat route, chat components, hooks, stores, GraphQL, and WebSocket Gateway.

# Primary Outcome

An authenticated user can exchange a configurable, streamed AI conversation and return to it later.

# Domain Ownership

The browser owns composition and presentation. The gateway owns streaming. Next.js owns configuration reads and durable persistence.

# Core Concepts

## Workspace

The protected chat layout containing the conversation sidebar, message list, composer, settings, and header.

## Chat turn

A user message and assistant response. A completed turn is persisted by the gateway through GraphQL.

## Connection state

The socket is authenticated independently of the browser session and refreshes before the JWT expires.

# User Capabilities

- Start a new conversation.
- Continue an existing conversation.
- Stream Markdown responses.
- Cancel or recover from connection failures through bounded reconnection.
- Change assistant behavior through settings.

