// lib/db.ts
import { createClient } from "@libsql/client";

// Read client – can be a replica, token may be read‑only
const readUrl = process.env.TURSO_READ_URL || process.env.TURSO_DB_URL;
const readAuthToken = process.env.TURSO_READ_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!readUrl) {
  throw new Error("Missing TURSO_DB_URL or TURSO_READ_URL environment variable");
}

export const turso = createClient({
  url: readUrl,
  authToken: readAuthToken,
});

// Write client – must point to the primary database and use a write‑enabled token
const writeUrl = process.env.TURSO_WRITE_URL || process.env.TURSO_DB_URL;
const writeAuthToken = process.env.TURSO_WRITE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!writeUrl) {
  throw new Error("Missing TURSO_DB_URL or TURSO_WRITE_URL environment variable");
}

export const tursoWrite = createClient({
  url: writeUrl,
  authToken: writeAuthToken,
});