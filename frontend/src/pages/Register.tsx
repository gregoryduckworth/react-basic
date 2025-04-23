import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import "../App.css";

function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(t("passwords_no_match"));
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || t("register_failed"));
        return;
      }
      setMessage(null);
      navigate("/login");
    } catch (err) {
      setMessage(t("register_failed"));
    }
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
            {t("register_title")}
          </h1>
          <p className="text-gray-500 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
            {t("register_subtitle")}
          </p>
        </header>
        <main className="w-full max-w-md bg-white shadow-xl rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-6">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleRegister}
          >
            <input
              type="email"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("confirm_password")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit">{t("register")}</Button>
          </form>
          {message && (
            <div className="text-green-600 font-medium text-center">
              {message}
            </div>
          )}
          <div className="flex flex-col gap-2 w-full text-center">
            <a href="/login" className="text-blue-500 hover:underline text-sm">
              {t("login_link")}
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
