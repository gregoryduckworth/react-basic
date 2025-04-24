import React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoggedOutLayout from "../../components/layout/LoggedOutLayout";

const Home = () => {
  const { t } = useTranslation();
  return (
    <LoggedOutLayout>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          fontWeight={800}
          mb={1}
          align="center"
        >
          {t("title", "Welcome")}
        </Typography>
        <Typography color="primary" align="center" mb={2}>
          {t("subtitle_simple")}
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            href="/login"
            variant="contained"
            color="primary"
            size="large"
          >
            {t("login")}
          </Button>
          <Button
            href="/register"
            variant="contained"
            color="success"
            size="large"
          >
            {t("register")}
          </Button>
        </Box>
      </Paper>
    </LoggedOutLayout>
  );
};

export default Home;
