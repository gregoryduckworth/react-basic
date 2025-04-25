import { fetchApi } from "./api";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  ErrorResponse,
} from "@types";

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetchApi<AuthResponse>("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if ((response as ErrorResponse).errorKey) throw response;
  return response as AuthResponse;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetchApi<AuthResponse>("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if ((response as ErrorResponse).errorKey) throw response;
  return response as AuthResponse;
}
