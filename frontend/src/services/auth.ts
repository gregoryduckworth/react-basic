import { fetchApi } from "@services/api";
import type { Auth } from "@types";

export async function register(
  data: Auth.RegisterRequest
): Promise<Auth.AuthResponse> {
  return fetchApi<Auth.AuthResponse>("/register", {
    method: "POST",
    body: data,
  });
}

export async function login(
  data: Auth.LoginRequest
): Promise<Auth.AuthResponse> {
  return fetchApi<Auth.AuthResponse>("/login", {
    method: "POST",
    body: data,
  });
}
