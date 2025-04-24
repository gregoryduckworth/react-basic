import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h4" color="primary" fontWeight={800} align="center">
        {t("dashboard_title")}
      </Typography>
      <Typography color="primary" align="center">
        {t("dashboard_subtitle")}
      </Typography>
    </Box>
  );
};

export default Dashboard;
