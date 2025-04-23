import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { fetchApi } from "../services/api";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";

function Homepage() {
  const [apiCall, setApiCall] = useState<string | null>(null);
  const { t } = useTranslation();

  async function checkHealth() {
    setApiCall(null);
    try {
      await fetchApi("/health");
      setApiCall(t("api_healthy"));
    } catch (err) {
      setApiCall(t("api_unreachable"));
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-4">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex flex-col items-center gap-4 mb-8 px-2 sm:px-4">
          <div className="flex gap-4 sm:gap-6 items-center flex-wrap justify-center">
            <a
              href="https://vite.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={viteLogo}
                className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-md hover:scale-110 transition-transform"
                alt={t("vite_logo_alt")}
              />
            </a>
            <span className="text-xl sm:text-2xl font-semibold text-gray-400">
              {t("plus")}
            </span>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={reactLogo}
                className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-md hover:scale-110 transition-transform"
                alt={t("react_logo_alt")}
              />
            </a>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-700 tracking-tight text-center">
            {t("title")}
          </h1>
          <p className="text-gray-500 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
            {t("subtitle_simple")}
          </p>
        </header>
        <main className="w-full max-w-md bg-white shadow-xl rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
            <Button onClick={checkHealth}>{t("check_api_health")}</Button>
          </div>
          {apiCall && (
            <div className="text-green-600 font-medium text-center break-words">
              {apiCall}
            </div>
          )}
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            {t("edit_and_save_simple")}
          </p>
        </main>
        <footer className="mt-8 sm:mt-10 text-gray-400 text-xs text-center px-2">
          {t("footer")}
        </footer>
      </div>
    </div>
  );
}

export default Homepage;
