# Text Attachments Domain

## Purpose

Describe the bounded text-file attachment capability.

# Domain Status

**Current MVP capability.** Attachments travel inside the chat message and are not stored as independent records.

# Behavior

The browser serializes attachment name, type, size, and text content behind the marker `__SAIGELY_TEXT_ATTACHMENTS_V1__`. The gateway receives the resulting message through the normal chat protocol.

# Constraints

The serialized WebSocket frame is measured in UTF-8 bytes and bounded by the shared 640 KiB payload limit. JSON escaping is included in the measurement.

# Security and Product Boundaries

Only text content is supported. There is no binary upload store, virus scanning pipeline, attachment sharing, or attachment history. Do not loosen the limit without coordinating the browser, gateway, and tests.

