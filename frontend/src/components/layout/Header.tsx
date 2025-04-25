import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { AccountCircle, LightMode, DarkMode } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeMode } from "@context/ThemeContext";

const Header = ({
  onSidebarToggle,
  sidebarCollapsed,
}: {
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
}) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, toggleTheme } = useThemeMode();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="inherit"
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        boxShadow: 1,
        zIndex: 1300,
        width: "100%",
        left: 0,
        top: 0,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 64,
          px: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          {onSidebarToggle && (
            <IconButton
              edge="start"
              color="primary"
              aria-label={
                sidebarCollapsed
                  ? t("common.expand_sidebar")
                  : t("common.collapse_sidebar")
              }
              onClick={onSidebarToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img
            src="/vite.svg"
            alt="Logo"
            style={{ height: 32, marginRight: 8 }}
          />
          <Typography variant="h6" fontWeight={800} color="primary">
            HR Copilot
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={toggleTheme}
            color="primary"
            aria-label="toggle theme"
          >
            {mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
          {user && (
            <>
              <Button
                size="large"
                onClick={handleMenu}
                startIcon={<AccountCircle />}
                sx={{
                  textTransform: "capitalize",
                  color: "text.primary",
                  borderColor: "divider",
                  fontWeight: 600,
                  ml: 1,
                }}
                aria-label={t("common.settings")}
                aria-controls={anchorEl ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
              >
                {user.first_name} {user.last_name}
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                >
                  {t("profile.profile", "Profile")}
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  {t("common.logout")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
