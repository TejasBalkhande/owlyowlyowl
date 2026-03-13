// functions/test-db.ts
import { createClient } from "@libsql/client/web";

// If you have @cloudflare/workers-types installed, you can use:
// import type { EventContext } from "@cloudflare/workers-types";
// export async function onRequest(context: EventContext<Env, any, any>) {
// For simplicity, we'll use a basic inline type:
interface Env {
  TURSO_DB_URL: string;
  TURSO_AUTH_TOKEN: string;
}

export async function onRequest(context: { env: Env }) {
  const { env } = context;

  const url = env.TURSO_DB_URL;
  const authToken = env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return new Response(
      JSON.stringify({ error: "Missing TURSO_DB_URL or TURSO_AUTH_TOKEN" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const turso = createClient({ url, authToken });

  try {
    const result = await turso.execute("SELECT 1 as test");
    return new Response(
      JSON.stringify({
        success: true,
        rows: result.rows,
        env: { url: url.replace(/:[^:]*@/, ":***@") }, // mask token in log
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: (error as Error).message,
        stack: (error as Error).stack,
        env: { url: url.replace(/:[^:]*@/, ":***@") },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}