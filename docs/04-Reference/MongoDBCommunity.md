# Saigely MongoDB Setup

## Purpose

Describe the minimal MongoDB arrangement for local development and the MVP deployment.

# Database

The application connects with `MONGODB_URI` and uses the `saigely` database. The application creates/uses the `conversations` collection through the repository.

# Application User

The connection must be able to read, insert, update, and delete documents in `saigely.conversations`. Prefer a dedicated least-privilege database user for hosted deployments.

# Collections

## `conversations`

Documents contain the owner ID, timestamps, and embedded messages. A production-sized dataset should add an index on `{ userId: 1, updatedAt: -1 }` to support the sidebar query; verify the index before adding it to a managed environment.

# Setup Checklist

- Create a MongoDB deployment.
- Create a database user and allow the application origin/network as appropriate.
- Set `MONGODB_URI` without committing it.
- Confirm the database name is `saigely`.
- Sign in and complete one chat turn to verify connectivity.

