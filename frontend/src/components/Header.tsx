import { useTranslation } from "react-i18next";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex w-full items-center justify-between">
      <span className="font-bold text-lg text-blue-700">
        {t("dashboard_title")}
      </span>
      <LogoutButton onLogout={handleLogout} aria-label={t("logout")} />
    </div>
  );
};

export default Header;
