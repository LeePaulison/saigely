# Saigely Foundations

## Project Status

Saigely is an implemented MVP for authenticated, configurable AI chat with streamed responses and persistent conversation history.

# Mission

Make a polished AI conversation experience that is simple to use, technically credible, and transparent about its boundaries.

# Product Entry Principle

The user should be able to sign in, choose how the assistant behaves, send a message, and see a useful streamed response without learning the underlying services.

# Platform Philosophy

## Keep the MVP small

The application concentrates on chat rather than pretending to be a general AI platform. Models, agents, reasoning, verbosity, and temperature are configuration inputs to the same conversation workflow.

## Separate web concerns from streaming concerns

Next.js owns identity, GraphQL, persistence, and UI. The WebSocket Gateway owns the long-lived connection and OpenAI streaming. Neither service should silently take ownership of the other’s durable responsibilities.

## Make boundaries observable and testable

Authentication, ownership filters, request limits, attachment limits, reconnection behavior, and security headers are explicit code concerns with focused tests.

# MVP Principles

- Persist user conversations, not transient UI state.
- Keep provider and model configuration data-driven.
- Never trust a conversation ID without validating it and checking ownership.
- Treat streamed output as an interrupted process that can fail or reconnect.
- Document the deployed topology as it exists today.

