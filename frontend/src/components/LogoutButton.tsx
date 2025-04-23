import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

interface LogoutButtonProps {
  onLogout: () => void;
}

function LogoutButton({ onLogout }: LogoutButtonProps) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirm = () => {
    setShowConfirm(false);
    onLogout();
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
      <Button
        onClick={handleClick}
        aria-label={t("logout")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors font-semibold shadow"
      >
        {t("logout")}
      </Button>
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
              <Button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                {t("confirm")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutButton;
