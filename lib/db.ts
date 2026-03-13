// lib/db.ts
import { createClient } from "@libsql/client/web";

function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

// Convert libsql:// URL to https:// if needed
function ensureHttpsUrl(url: string): string {
  if (url.startsWith("libsql://")) {
    // Replace libsql:// with https://
    return url.replace(/^libsql:\/\//, "https://");
  }
  return url;
}

// Read client – can be a replica
const readUrl = ensureHttpsUrl(process.env.TURSO_READ_URL || getEnvVar("TURSO_DB_URL"));
const readAuthToken = process.env.TURSO_READ_AUTH_TOKEN || getEnvVar("TURSO_AUTH_TOKEN");

export const turso = createClient({
  url: readUrl,
  authToken: readAuthToken,
});

// Write client – must point to the primary database
const writeUrl = ensureHttpsUrl(process.env.TURSO_WRITE_URL || getEnvVar("TURSO_DB_URL"));
const writeAuthToken = process.env.TURSO_WRITE_AUTH_TOKEN || getEnvVar("TURSO_AUTH_TOKEN");

export const tursoWrite = createClient({
  url: writeUrl,
  authToken: writeAuthToken,
});