import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const registered = location.state && location.state.registered;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) {
      setMessage(t("login_failed"));
      return;
    }
    setMessage(null);
    navigate("/dashboard");
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-4">
      <a
        href="/"
        className="fixed top-4 left-4 text-blue-700 font-bold text-lg hover:underline z-50 bg-white/80 px-3 py-1 rounded shadow"
      >
        {t("homepage")}
      </a>
      <div className="w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex flex-col items-center gap-4 mb-8 px-2 sm:px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-700 tracking-tight text-center">
            {t("login_title")}
          </h1>
          <p className="text-gray-500 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
            {t("login_subtitle")}
          </p>
        </header>
        <main className="w-full max-w-md bg-white shadow-xl rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-6">
          {registered && (
            <div
              className="text-green-600 font-medium text-center"
              role="status"
            >
              {t("register_success")}
            </div>
          )}
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleLogin}
            aria-label={t("login_form_label")}
          >
            <label htmlFor="email" className="sr-only">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <label htmlFor="password" className="sr-only">
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? t("logging_in") : t("login")}
            </Button>
          </form>
          {message && (
            <div className="text-red-600 font-medium text-center" role="alert">
              {message}
            </div>
          )}
          <div className="flex flex-col gap-2 w-full text-center">
            <a
              href="/forgotten-password"
              className="text-blue-500 hover:underline text-sm"
            >
              {t("forgot_password_link")}
            </a>
            <a
              href="/register"
              className="text-blue-500 hover:underline text-sm"
            >
              {t("register_link")}
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
