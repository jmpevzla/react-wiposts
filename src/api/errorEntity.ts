import type { AxiosError } from "axios";

interface ServerError {
  error: string
}

export interface TError extends AxiosError<ServerError> {
  statusNum: number
}