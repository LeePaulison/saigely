# Saigely GraphQL Schema Reference

## Purpose

Describe the SDL files and current operation surface.

# Schema Files

SDL lives in `graphql/schemas`. `index.js` loads and merges the files; resolver wiring lives in `graphql/resolvers`.

# Queries

| Query | Result |
| --- | --- |
| `conversations` | Authenticated user’s summaries |
| `conversation(id)` | One owned conversation |
| `preferences` | Current user preferences |
| `aiModels` | Enabled model configuration |
| `aiAgents` | Agent summaries |
| `aiAgentConfiguration(agentId)` | Agent prompt/configuration |
| `reasoningLevels` | Enabled reasoning levels |
| `verbosityLevels` | Enabled verbosity levels |

# Mutations

| Mutation | Purpose |
| --- | --- |
| `saveConversationTurn(input)` | Create or append a user/assistant turn |
| `deleteConversation(id)` | Delete an owned conversation |
| `updatePreferences(input)` | Replace the current user preference selection |

# Gateway Contract

The gateway uses preferences, models, agent configuration, and `saveConversationTurn`. Keep field names and payloads compatible with the shared [OpenAI WebSocket Gateway README](https://github.com/LeePaulison/openai-websocket-gateway).

