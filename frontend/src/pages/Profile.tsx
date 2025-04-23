import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LoggedInLayout from "../components/LoggedInLayout";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <LoggedInLayout sidebar={<Sidebar />} header={<Header />}>
      <section className="flex flex-col items-center gap-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 text-center">
          {t("profile_title", "Profile")}
        </h1>
        <div className="text-blue-700 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
          <div className="space-y-2">
            <div>
              <span className="font-semibold">
                {t("first_name", "First Name")}:
              </span>{" "}
              {user?.first_name || "-"}
            </div>
            <div>
              <span className="font-semibold">
                {t("last_name", "Last Name")}:
              </span>{" "}
              {user?.last_name || "-"}
            </div>
            <div>
              <span className="font-semibold">{t("email", "Email")}:</span>{" "}
              {user?.email || "-"}
            </div>
          </div>
        </div>
      </section>
    </LoggedInLayout>
  );
};

export default Profile;
