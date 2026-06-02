import { createApi } from "@reduxjs/toolkit/query/react";
import { createSupabaseBaseQuery } from "./createSupabaseBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: createSupabaseBaseQuery({ apiPath: "rest", withAuth: true }),
  tagTypes: ["Turmas", "Alunos", "Financeiro"],
  endpoints: () => ({}),
});
