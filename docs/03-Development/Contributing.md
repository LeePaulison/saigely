# Saigely Contributing Guide

## Purpose

Provide a small, repeatable workflow for changes to the MVP.

# Before Starting Work

Read the relevant project, architecture, domain, and reference document. For gateway changes, also read the shared gateway README and confirm whether the protocol contract changes.

# Development Workflow

1. Identify the owning service and boundary.
2. Update the implementation and its focused tests.
3. Update the relevant Markdown reference if behavior, configuration, or schema changed.
4. Run tests, lint, and build for the web app.
5. For coordinated changes, follow [operations.md](../operations.md) deployment order.

# Secrets

Never commit `.env`, OAuth secrets, database URLs, OpenAI keys, JWTs, prompts, attachments, or model output.

# Review Checklist

- Is authentication required where it should be?
- Is user ownership enforced in the database operation?
- Are limits and failure states explicit?
- Are the GraphQL and WebSocket contracts still compatible?
- Does the documentation describe the deployed behavior?

