export type UserRole = "aluno" | "admin";

export type AuthMode = "login" | "register";

export const AUTH_ROUTES: Record<UserRole, string> = {
  aluno: "/login/aluno",
  admin: "/login/admin",
};

export const PAINEL_ROUTE = "/painel";
