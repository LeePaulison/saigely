# Saigely AI Server Architecture

## Purpose

Describe the separately maintained OpenAI WebSocket Gateway that completes Saigely’s runtime.

# Responsibilities

- Accept browser WebSocket connections.
- Authenticate the socket with the Saigely JWT contract.
- Load user preferences and agent/model configuration through GraphQL.
- Send requests to the OpenAI Responses API.
- Stream chunks to the browser.
- Persist completed turns through GraphQL.
- Expose health and readiness endpoints.

# Runtime Flow

```text
authenticate -> load configuration -> chat_message -> OpenAI stream
                                               -> chat_chunk*
                                               -> persist -> chat_complete
```

# Contract Notes

The browser sends `authenticate` and `chat_message` messages. The gateway returns `authenticated`, `authentication_error`, `chat_chunk`, `chat_complete`, or `error` messages. The client refreshes the five-minute token by closing and reopening the socket.

# Health and Readiness

`/health` proves the process is alive. `/ready` checks OpenAI, JWKS, GraphQL, and the application origin. See [operations.md](../operations.md) for interpretation and incident response.

