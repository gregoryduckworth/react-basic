export interface ErrorResponse {
  errorKey: string;
  status: number;
}

export type ApiResponse<T> = T | ErrorResponse;

export interface HealthResponse {
  status: "ok";
}
