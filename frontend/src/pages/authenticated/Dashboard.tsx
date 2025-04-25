import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4" color="primary">
        {t("dashboard_title")}
      </Typography>
      <Typography>{t("dashboard_subtitle")}</Typography>
    </>
  );
};

export default Dashboard;
