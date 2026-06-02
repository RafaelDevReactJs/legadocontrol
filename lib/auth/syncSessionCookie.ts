import type { LoginResponse } from "@/types/session";
import { persistSession } from "./session";

/**
 * Grava sessão no localStorage e define cookie httpOnly via API do Next
 * para o proxy reconhecer a autenticação no servidor.
 */
export async function syncSessionCookie(session: LoginResponse): Promise<void> {
  persistSession(session);

  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      access_token: session.access_token,
      expires_in: session.expires_in,
    }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível salvar a sessão no navegador.");
  }
}

export async function clearSessionCookie(): Promise<void> {
  await fetch("/api/auth/session", {
    method: "DELETE",
    credentials: "same-origin",
  });
}
