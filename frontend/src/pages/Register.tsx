import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { fetchApi } from "../services/api";
import "../App.css";

function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(t("passwords_no_match"));
      return;
    }
    setLoading(true);
    try {
      await fetchApi("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });
      setMessage(null);
      setLoading(false);
      navigate("/login", { state: { registered: true } });
    } catch (err: any) {
      setLoading(false);
      const errorKey =
        err?.message?.errorKey || err?.errorKey || err?.message || err;
      setMessage(t(errorKey));
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
            aria-label={t("register_form_label")}
          >
            <label htmlFor="firstName" className="sr-only">
              {t("first_name", "First Name")}
            </label>
            <input
              id="firstName"
              type="text"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("first_name", "First Name")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="given-name"
            />
            <label htmlFor="lastName" className="sr-only">
              {t("last_name", "Last Name")}
            </label>
            <input
              id="lastName"
              type="text"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("last_name", "Last Name")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="family-name"
            />
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
              autoComplete="new-password"
            />
            <label htmlFor="confirmPassword" className="sr-only">
              {t("confirm_password")}
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="border rounded px-3 py-2 w-full text-gray-900"
              placeholder={t("confirm_password")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <Button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? t("registering") : t("register")}
            </Button>
          </form>
          {message && (
            <div className="text-red-600 font-medium text-center" role="alert">
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
