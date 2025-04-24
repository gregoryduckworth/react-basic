import { useTranslation } from "react-i18next";
import LoggedInLayout from "../components/layout/LoggedInLayout";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function Dashboard() {
  const { t } = useTranslation();

  return (
    <LoggedInLayout sidebar={<Sidebar />} header={<Header />}>
      <section className="flex flex-col items-center gap-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 text-center">
          {t("dashboard_title")}
        </h1>
        <p className="text-blue-700 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
          {t("dashboard_subtitle")}
        </p>
      </section>
    </LoggedInLayout>
  );
}

export default Dashboard;
