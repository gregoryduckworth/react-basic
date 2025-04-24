import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/common/Button";
import "../App.css";

function ForgottenPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleForgotten(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessage(t("forgotten_password_sent"));
      setLoading(false);
    }, 800);
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
            {t("forgotten_title")}
          </h1>
          <p className="text-gray-500 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
            {t("forgotten_subtitle")}
          </p>
        </header>
        <main className="w-full max-w-md bg-white shadow-xl rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-6">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleForgotten}
            aria-label={t("forgotten_form_label")}
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
            <Button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? t("sending") : t("send_reset_link")}
            </Button>
          </form>
          {message && (
            <div
              className="text-green-600 font-medium text-center"
              role="status"
            >
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

export default ForgottenPassword;
