# Saigely Component Guide

## Purpose

Describe the current component organization and UI expectations.

# Component Principles

## Feature-first organization

Chat behavior belongs in `components/chat`; Markdown behavior belongs in `components/markdown`; shared identity controls belong in `components/ui`.

## Keep durable data out of component state

Load and persist through GraphQL hooks/stores. Components should coordinate presentation, not duplicate repository logic.

## Respect server/client boundaries

Protected layouts and data access can remain server-side. Socket effects, browser auth token retrieval, file reading, and interactive controls belong in client components.

# UI States

Every asynchronous surface should account for loading, empty, error, disconnected, and successful states. Chat completion and error must clear the in-flight state consistently.

# Markdown

Use the shared renderer for Markdown and code blocks. Do not add a second renderer in a feature component.

