import React, { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "../auth/Logout";

const Header = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header role="banner" aria-label="Main header" className="w-full">
      <div className="flex w-full items-center justify-between">
        <span className="font-bold text-lg text-blue-700">
          {t("dashboard_title")}
        </span>
        {user && (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer select-none"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              aria-controls="profile-menu"
              tabIndex={0}
              role="button"
              aria-label={t("settings")}
            >
              <span className="font-semibold text-blue-700">
                {`${user.first_name} ${user.last_name}` || t("settings")}
              </span>
              <svg
                className="w-4 h-4 text-blue-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {dropdownOpen && (
              <div
                id="profile-menu"
                role="menu"
                aria-label={t("profile", "Profile")}
                className="absolute right-0 mt-2 w-40 bg-white border border-blue-700/30 rounded shadow-lg z-10"
              >
                <div
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer text-blue-700 font-semibold"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  role="menuitem"
                  tabIndex={-1}
                >
                  {t("profile", "Profile")}
                </div>
                <div className="border-t my-1 border-blue-700/30" />
                <div
                  className="block w-full text-left px-4 py-2"
                  role="menuitem"
                  tabIndex={-1}
                >
                  <Logout />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
