/**
 * Rotas da API Auth do Supabase (base: NEXT_PUBLIC_SUPABASE_URL/auth/v1)
 *
 * Login (e-mail + senha) → retorna access_token, refresh_token, user
 * POST /auth/v1/token?grant_type=password
 *
 * Cadastro de novo usuário
 * POST /auth/v1/signup
 */
export const SUPABASE_AUTH_ENDPOINTS = {
  login: "/token?grant_type=password",
  signUp: "/signup",
  logout: "/logout",
} as const;

export function getSupabaseAuthPath(
  endpoint: keyof typeof SUPABASE_AUTH_ENDPOINTS
): string {
  return SUPABASE_AUTH_ENDPOINTS[endpoint];
}
