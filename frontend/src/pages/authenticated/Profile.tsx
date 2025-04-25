import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h4" color="primary">
        {t("profile_title", "Profile")}
      </Typography>
      <Typography>
        {t("first_name")}:{user?.first_name || "-"}
      </Typography>
      <Typography>
        {t("last_name")}:{user?.last_name || "-"}
      </Typography>
      <Typography>
        {t("email")}:{user?.email || "-"}
      </Typography>
    </>
  );
};

export default Profile;
