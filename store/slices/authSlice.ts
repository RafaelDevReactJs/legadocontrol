import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearPersistedSession,
  loadPersistedSession,
  persistSession,
} from "@/lib/auth/session";
import type { AuthUser, LoginResponse } from "@/types/session";
import { authApi } from "../api/authApi";

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,
};

function mapSessionToState(session: LoginResponse): AuthState {
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at,
    user: session.user,
    isAuthenticated: true,
    isHydrated: true,
  };
}

export function getAuthPreloadedState():
  | {
      auth: AuthState;
    }
  | undefined {
  if (typeof window === "undefined") return undefined;

  const session = loadPersistedSession();
  if (!session) return undefined;

  return { auth: mapSessionToState(session) };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state) {
      const session = loadPersistedSession();
      if (session) {
        Object.assign(state, mapSessionToState(session));
      } else {
        state.isHydrated = true;
      }
    },
    setSession(state, action: PayloadAction<LoginResponse>) {
      Object.assign(state, mapSessionToState(action.payload));
      persistSession(action.payload);
    },
    clearSession(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresAt = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isHydrated = true;
      clearPersistedSession();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        Object.assign(state, mapSessionToState(action.payload));
        persistSession(action.payload);
      })
      .addMatcher(authApi.endpoints.signUp.matchFulfilled, (state, action) => {
        Object.assign(state, mapSessionToState(action.payload));
        persistSession(action.payload);
      });
  },
});

export const { hydrateAuth, setSession, clearSession } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsAuthHydrated = (state: { auth: AuthState }) =>
  state.auth.isHydrated;
