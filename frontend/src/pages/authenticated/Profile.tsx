import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h4" color="primary" align="center">
        {t("profile_title", "Profile")}
      </Typography>
      <Box color="primary.main" textAlign="center" maxWidth={400}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box>
            <Typography component="span">{t("first_name")}:</Typography>{" "}
            {user?.first_name || "-"}
          </Box>
          <Box>
            <Typography component="span">{t("last_name")}:</Typography>{" "}
            {user?.last_name || "-"}
          </Box>
          <Box>
            <Typography component="span">{t("email")}:</Typography>{" "}
            {user?.email || "-"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
