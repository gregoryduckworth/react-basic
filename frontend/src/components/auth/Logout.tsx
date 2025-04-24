import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function Logout() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirm = () => {
    setShowConfirm(false);
    logout();
  };

  useEffect(() => {
    if (showConfirm && modalRef.current) {
      modalRef.current.focus();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowConfirm(false);
    };
    if (showConfirm) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showConfirm]);

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        aria-label={t("logout")}
        className="text-blue-600 hover:underline focus:underline block text-left px-4 py-2"
        style={{ background: "none", border: "none", padding: 0, margin: 0 }}
      >
        {t("logout")}
      </a>
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          aria-modal="true"
          role="dialog"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white rounded shadow-lg p-6 flex flex-col items-center gap-4 min-w-[300px] outline-none"
          >
            <p className="text-gray-800 text-lg">{t("logout_confirm")}</p>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
