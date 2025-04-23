import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleLogout() {
    // Here you would also clear any auth state/token if implemented
    navigate("/login");
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-4">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex flex-col items-center gap-4 mb-8 px-2 sm:px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-700 tracking-tight text-center">
            {t("dashboard_title")}
          </h1>
          <p className="text-gray-500 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
            {t("dashboard_subtitle")}
          </p>
        </header>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
          onClick={handleLogout}
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
