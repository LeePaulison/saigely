# Saigely Frontend Architecture

## Purpose

Describe the Next.js App Router UI and client-side state.

# Technology Baseline

Next.js 16 App Router, React 19, Tailwind CSS 4, Radix UI, Zustand, React Markdown, remark-gfm, and syntax highlighting.

# Routing Model

```text
app/page.js                 public entry
app/login/page.js           authentication entry
app/(protected)/layout.js   session-protected shell
app/(protected)/chat/page.js chat route
app/api/auth/[...all]       Better Auth handler
app/api/graphql             GraphQL Yoga handler
```

# Component Areas

- `components/chat`: layout, composer, messages, sidebar, settings, and client orchestration.
- `components/markdown`: safe Markdown presentation and code blocks.
- `components/ui`: header and user menu.
- `hooks`: socket lifecycle, initialization, preference selection, and hydration.
- `store`: conversation and preference presentation state.

# State Guidance

Durable data is loaded through GraphQL and represented in Zustand only for client presentation. Socket connection state and in-flight requests remain inside the chat hook; settings are persisted through the preferences mutation.

