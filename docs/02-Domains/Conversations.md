# Conversations Domain

## Purpose

Describe durable conversation history.

# Domain Status

**Current MVP domain.** Conversations are stored in MongoDB and exposed through GraphQL.

# Primary Outcome

Users can revisit their own conversation history without exposing another user’s data.

# Core Concepts

## Conversation

An owned document with a MongoDB ObjectId, timestamps, and embedded messages.

## Message

A role/content/timestamp record. The current persistence contract writes user and assistant messages as completed turns.

## Summary

A lightweight sidebar projection containing the conversation ID, update time, and first-message preview.

# Operations

`conversations` lists the authenticated user’s summaries. `conversation(id)` returns the full owned document. `saveConversationTurn` creates or appends a turn. `deleteConversation` validates the ID and deletes only the authenticated user’s document.

# Invariants

- Invalid ObjectIds are rejected before database queries.
- Conversation reads and writes require authentication.
- Ownership is included in mutations, not checked only in application memory.

