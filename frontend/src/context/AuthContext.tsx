import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login as loginApi } from "../services/auth";
import type { AuthContextType, User, ActionResult } from "@types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<ActionResult> => {
    try {
      const data = await loginApi({ email, password });
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    } catch (err: any) {
      return { success: false, errorKey: err?.errorKey || "login_failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>{t("loading")}</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { t } = useTranslation();
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error(t("auth_context_error"));
  return ctx;
}
