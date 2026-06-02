import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getSupabaseEnv } from "@/lib/env";
import { getSupabaseHeaders } from "./supabaseHeaders";

type SupabaseBaseQueryArgs = {
  apiPath: "auth" | "rest";
  withAuth?: boolean;
};

export function createSupabaseBaseQuery({
  apiPath,
  withAuth = false,
}: SupabaseBaseQueryArgs): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> {
  return async (args, api, extraOptions) => {
    const env = getSupabaseEnv();

    if (!env) {
      return {
        error: {
          status: "CUSTOM_ERROR",
          error:
            "Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY não encontradas. Reinicie o servidor (yarn dev).",
          data: {
            message:
              "Configuração do Supabase ausente. Verifique o arquivo .env.local e reinicie o yarn dev.",
          },
        },
      };
    }

    const baseUrl =
      apiPath === "auth"
        ? `${env.url}/auth/v1`
        : `${env.url}/rest/v1`;

    const rawBaseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState, endpoint }) => {
        const state = getState() as { auth: { accessToken: string | null } };
        const needsAuth = withAuth || endpoint === "logout";
        const token = needsAuth ? state.auth.accessToken : null;

        const supabaseHeaders = getSupabaseHeaders(needsAuth, token);
        supabaseHeaders.forEach((value, key) => {
          headers.set(key, value);
        });

        return headers;
      },
    });

    return rawBaseQuery(args, api, extraOptions);
  };
}
