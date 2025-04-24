import React, { memo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
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
    <header style={{ width: "100%", background: "#4F6D7A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", minHeight: 56 }}>
      <span style={{ fontWeight: 700, fontSize: 20 }}>{t("dashboard_title")}</span>
      {user && (
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: 600,
              background: dropdownOpen ? "#3a506b" : "transparent",
              userSelect: "none",
            }}
            onClick={() => setDropdownOpen((open) => !open)}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <span>{user.first_name} {user.last_name}</span>
            <span style={{ fontSize: 12, marginLeft: 4 }}>▼</span>
          </div>
          {dropdownOpen && (
            <div style={{ position: "absolute", right: 0, top: "100%", marginTop: 4, background: "#fff", color: "#222", border: "1px solid #e0e0e0", borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", minWidth: 140, zIndex: 10 }}>
              <div
                style={{ padding: "10px 16px", cursor: "pointer", fontWeight: 500, borderBottom: "1px solid #e0e0e0" }}
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                {t("profile", "Profile")}
              </div>
              <div
                style={{ padding: "10px 16px", cursor: "pointer", fontWeight: 500, color: "#d32f2f" }}
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                {t("logout")}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default memo(Header);
