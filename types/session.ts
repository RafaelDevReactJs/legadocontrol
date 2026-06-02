export type AuthUser = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at?: string;
  phone?: string;
  last_sign_in_at?: string;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
  is_anonymous?: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: AuthUser;
};

export type SignUpRequest = {
  email: string;
  password: string;
  name?: string;
};

export type SupabaseAuthError = {
  error?: string;
  error_description?: string;
  msg?: string;
  message?: string;
};
