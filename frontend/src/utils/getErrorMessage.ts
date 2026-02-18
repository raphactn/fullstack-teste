import axios from "axios";

export type DefaultApiError = {
  message?: string;
  error?: string;
};

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<DefaultApiError>(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Erro na requisição."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }
  return "Erro inesperado.";
}
