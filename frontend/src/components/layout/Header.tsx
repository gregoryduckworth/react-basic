import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          minHeight: "56px !important",
          p: 0,
        }}
      >
        <Typography sx={{ color: "white", pl: 2 }}>
          {t("dashboard_title")}
        </Typography>
        {user && (
          <>
            <Button
              size="large"
              onClick={handleMenu}
              startIcon={<AccountCircle />}
              sx={{
                textTransform: "capitalize",
                color: "white",
                borderColor: "white",
                "&:hover": { borderColor: "white" },
              }}
              aria-label={t("settings")}
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
                {t("profile", "Profile")}
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                {t("logout")}
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
