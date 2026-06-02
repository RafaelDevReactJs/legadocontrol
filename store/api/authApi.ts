import { createApi } from "@reduxjs/toolkit/query/react";
import { SUPABASE_AUTH_ENDPOINTS } from "@/app/config/supabaseAuth";
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SupabaseAuthError,
} from "@/types/session";
import { createSupabaseBaseQuery } from "./createSupabaseBaseQuery";

function getErrorMessage(data: unknown): string {
  if (typeof data === "object" && data !== null) {
    const err = data as SupabaseAuthError;
    return (
      err.error_description ??
      err.message ??
      err.msg ??
      err.error ??
      "Não foi possível autenticar."
    );
  }
  return "Não foi possível autenticar.";
}

function normalizeLoginResponse(response: unknown): LoginResponse {
  if (typeof response === "object" && response !== null) {
    const data = response as Record<string, unknown>;

    if (typeof data.access_token === "string") {
      return data as LoginResponse;
    }

    if (typeof data.session === "object" && data.session !== null) {
      const session = data.session as Record<string, unknown>;
      if (typeof session.access_token === "string") {
        return session as LoginResponse;
      }
    }
  }

  return response as LoginResponse;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createSupabaseBaseQuery({ apiPath: "auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: SUPABASE_AUTH_ENDPOINTS.login,
        method: "POST",
        body,
      }),
      transformResponse: normalizeLoginResponse,
      transformErrorResponse: (response) => ({
        message: getErrorMessage(response.data),
      }),
    }),
    signUp: builder.mutation<LoginResponse, SignUpRequest>({
      query: ({ email, password, name }) => ({
        url: SUPABASE_AUTH_ENDPOINTS.signUp,
        method: "POST",
        body: {
          email,
          password,
          data: name ? { full_name: name } : undefined,
        },
      }),
      transformResponse: normalizeLoginResponse,
      transformErrorResponse: (response) => ({
        message: getErrorMessage(response.data),
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: SUPABASE_AUTH_ENDPOINTS.logout,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useLogoutMutation } =
  authApi;
