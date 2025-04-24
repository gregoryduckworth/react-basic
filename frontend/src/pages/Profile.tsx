import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h4" color="primary" fontWeight={800} align="center">
        {t("profile_title", "Profile")}
      </Typography>
      <Box color="primary.main" textAlign="center" maxWidth={400}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box>
            <Typography fontWeight={600} component="span">
              {t("first_name", "First Name")}:
            </Typography>{" "}
            {user?.first_name || "-"}
          </Box>
          <Box>
            <Typography fontWeight={600} component="span">
              {t("last_name", "Last Name")}:
            </Typography>{" "}
            {user?.last_name || "-"}
          </Box>
          <Box>
            <Typography fontWeight={600} component="span">
              {t("email", "Email")}:
            </Typography>{" "}
            {user?.email || "-"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
