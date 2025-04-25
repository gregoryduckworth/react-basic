export namespace Auth {
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

  export interface User {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
  }

  export interface AuthResponse {
    user: User;
  }
}

export interface APIErrorResponse {
  errorKey: string;
  status: number;
  message?: string;
}

export interface HealthResponse {
  status: "ok";
}
