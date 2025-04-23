import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <span className="font-semibold text-blue-700">
            {t("dashboard_title")}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
