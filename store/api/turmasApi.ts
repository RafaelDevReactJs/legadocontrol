import { baseApi } from "./baseApi";

/**
 * Exemplo de endpoint REST do Supabase.
 * Ajuste o nome da tabela conforme o schema do backend.
 */
export const turmasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTurmas: builder.query<unknown[], void>({
      query: () => "/turmas?select=*",
      providesTags: ["Turmas"],
    }),
  }),
});

export const { useGetTurmasQuery } = turmasApi;
