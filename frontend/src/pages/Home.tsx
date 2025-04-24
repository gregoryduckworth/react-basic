import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center">
          {t("title", "Welcome")}
        </h1>
        <p className="text-blue-500 text-center mb-4">{t("subtitle_simple")}</p>
        <div className="flex gap-4">
          <a
            href="/login"
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            {t("login")}
          </a>
          <a
            href="/register"
            className="px-6 py-2 rounded bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors"
          >
            {t("register")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
