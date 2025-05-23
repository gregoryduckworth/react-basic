import React from "react";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoggedOutLayoutProps {
  children: React.ReactNode;
}

function LoggedOutLayout({ children }: LoggedOutLayoutProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      minHeight="100vh"
      width="100vw"
      bgcolor={theme.palette.background.default}
      display="flex"
      flexDirection="column"
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ mb: 4 }}
      >
        <Toolbar>
          <Link href="/" underline="hover" color="primary">
            <Typography
              variant="h6"
              fontWeight={700}
              color={theme.palette.primary.main}
            >
              {t("common.homepage")}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        {children}
      </Box>
    </Box>
  );
}

export default LoggedOutLayout;
