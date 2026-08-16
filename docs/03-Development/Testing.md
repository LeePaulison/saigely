# Saigely Testing Guide

## Purpose

Describe the current automated coverage and manual verification expectations.

# Test Runner

```bash
npm test
npm run lint
npm run build
```

# Current Coverage Areas

| Area | Coverage |
| --- | --- |
| Conversation repository/resolvers | ObjectId validation, ownership, creation, append, read, deletion |
| GraphQL request security | POST-only production behavior, JSON validation, body limits |
| Rate limiting | Window enforcement and reset |
| Reconnect | Bounded retry schedule and transient close handling |
| Security headers | CSP and browser transport protections |
| Text attachments | Complete serialized-frame byte measurement and escaping |

# What to Test

Test authorization and malformed input before happy paths. For transport changes, cover authentication failure, interrupted streams, duplicate sends, payload limits, and token refresh. For UI changes, manually verify loading, empty, error, light/dark/system themes, and responsive layouts.

# Manual Smoke Test

Sign in, load settings and history, send a harmless prompt, observe chunks, refresh, reopen the conversation, delete it, and confirm it disappears. Use [operations.md](../operations.md) for production smoke tests.

