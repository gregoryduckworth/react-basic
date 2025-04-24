import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <a
            href="/dashboard"
            className="font-semibold text-blue-700 hover:underline focus:underline"
          >
            {t("dashboard_title")}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
