import React, { memo } from "react";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <nav aria-label="Main sidebar navigation">
      <ul className="space-y-2">
        <li>
          <a
            href="/dashboard"
            className="font-semibold text-blue-700 hover:underline focus:underline"
            aria-current={
              window.location.pathname === "/dashboard" ? "page" : undefined
            }
          >
            {t("dashboard_title")}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Sidebar);
