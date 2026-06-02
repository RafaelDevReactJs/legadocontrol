import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const DEFAULT_MESSAGE =
  "Não foi possível concluir a operação. Tente novamente.";

export function getRtkErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return DEFAULT_MESSAGE;
  }

  if ("data" in error) {
    const data = (error as FetchBaseQueryError).data;

    if (typeof data === "object" && data !== null && "message" in data) {
      const message = (data as { message?: string }).message;
      if (message) return message;
    }

    if (typeof data === "string" && data.length > 0) {
      return data;
    }
  }

  if ("status" in error) {
    const fetchError = error as FetchBaseQueryError;

    if (fetchError.status === "FETCH_ERROR") {
      const detail =
        typeof fetchError.error === "string"
          ? fetchError.error
          : "Falha de rede ao contactar o servidor.";
      return detail;
    }

    if (fetchError.status === "CUSTOM_ERROR") {
      const detail =
        typeof fetchError.error === "string"
          ? fetchError.error
          : DEFAULT_MESSAGE;
      return detail;
    }

    if (typeof fetchError.status === "number" && fetchError.data) {
      return getRtkErrorMessage({ data: fetchError.data });
    }
  }

  if ("message" in error && typeof (error as Error).message === "string") {
    return (error as Error).message;
  }

  return DEFAULT_MESSAGE;
}
