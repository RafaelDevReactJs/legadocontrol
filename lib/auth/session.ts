import type { LoginResponse } from "@/types/session";

export const SESSION_STORAGE_KEY = "ct-legado-session";
export const ACCESS_TOKEN_COOKIE = "ct-legado-access-token";
/** Cookie leve para o proxy validar sessão (JWT fica no localStorage). */
export const AUTH_FLAG_COOKIE = "ct-legado-authenticated";

export function persistSession(session: LoginResponse): void {
  if (typeof window === "undefined") return;
  if (!session.access_token) return;

  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

    const maxAge = session.expires_in ?? 3600;
    document.cookie = `${AUTH_FLAG_COOKIE}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch {
    // localStorage bloqueado — sessão segue só no Redux até recarregar
  }
}

export function clearPersistedSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(SESSION_STORAGE_KEY);
  document.cookie = `${AUTH_FLAG_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function loadPersistedSession(): LoginResponse | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as LoginResponse;
    if (!session.access_token || !session.expires_at) return null;

    if (session.expires_at * 1000 < Date.now()) {
      clearPersistedSession();
      return null;
    }

    return session;
  } catch {
    clearPersistedSession();
    return null;
  }
}
