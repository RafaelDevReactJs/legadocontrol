export type SupabaseEnv = {
  url: string;
  publishableKey: string;
};

export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}

export function getSupabaseAuthUrl(): string | null {
  const env = getSupabaseEnv();
  return env ? `${env.url}/auth/v1` : null;
}

export function getSupabaseRestUrl(): string | null {
  const env = getSupabaseEnv();
  return env ? `${env.url}/rest/v1` : null;
}
