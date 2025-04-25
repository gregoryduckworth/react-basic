export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateUserRequest extends Partial<Omit<User, "id" | "email">> {
  password?: string;
}
