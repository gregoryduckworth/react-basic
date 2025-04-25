import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { Typography } from "@mui/material";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h4" color="primary">
        {t("profile.profile_title", "Profile")}
      </Typography>
      <Typography>
        {t("form.first_name")}:{user?.first_name || "-"}
      </Typography>
      <Typography>
        {t("form.last_name")}:{user?.last_name || "-"}
      </Typography>
      <Typography>
        {t("form.email")}:{user?.email || "-"}
      </Typography>
    </>
  );
};

export default Profile;
