# User Preferences Domain

## Purpose

Describe the controls that shape the chat experience.

# Domain Status

**Current MVP domain.** Preferences are stored in Postgres and loaded by both the browser and gateway.

# Core Concepts

The preference record is keyed by user ID and contains:

- `theme`
- `defaultModelId`
- `temperature`
- `defaultReasoningId`
- `defaultVerbosityId`
- `defaultAgentId`

# Supporting Configuration

Models, agents, reasoning levels, and verbosity levels are separate reference tables. Models advertise whether temperature, reasoning, verbosity, and streaming are supported. Agent system prompts are returned only through the dedicated configuration query.

# User Flow

The settings dialog loads available options, applies compatible controls, writes the complete preference input, and updates the client selection. The gateway reads the saved defaults when a chat request begins.

# Boundaries

Preferences are configuration, not a prompt-history feature. The MVP does not allow users to author or publish agents.

