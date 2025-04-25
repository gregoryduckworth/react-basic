import type { User } from "./user";

export interface RegisterRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export type ActionResult =
  | { success: true }
  | { success: false; errorKey: string };

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<ActionResult>;
  logout: () => void;
  loading: boolean;
}
