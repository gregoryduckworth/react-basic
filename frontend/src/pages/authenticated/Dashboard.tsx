import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex={1}
      height="100%"
      gap={2}
    >
      <Typography variant="h4" color="primary" align="center">
        {t("dashboard_title")}
      </Typography>
      <Typography color="primary" align="center">
        {t("dashboard_subtitle")}
      </Typography>
    </Box>
  );
};

export default Dashboard;
