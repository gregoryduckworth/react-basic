import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchApi } from "../services/api";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await fetchApi("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      setUser(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { t } = useTranslation();
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error(t("auth_context_error"));
  return ctx;
}
