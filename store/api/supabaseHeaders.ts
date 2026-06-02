import { getSupabaseEnv } from "@/lib/env";

export function getSupabaseHeaders(includeAuth = false, token?: string | null) {
  const env = getSupabaseEnv();
  const headers = new Headers();

  if (!env) {
    return headers;
  }

  headers.set("apikey", env.publishableKey);
  headers.set("Content-Type", "application/json");

  if (includeAuth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}
