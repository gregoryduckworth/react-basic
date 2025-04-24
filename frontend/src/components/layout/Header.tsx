import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutOpen = () => setLogoutOpen(true);
  const handleLogoutClose = () => setLogoutOpen(false);
  const handleLogoutConfirm = () => {
    setLogoutOpen(false);
    logout();
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ boxShadow: 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary" fontWeight={700}>
          {t("dashboard_title")}
        </Typography>
        {user && (
          <>
            <Button
              color="primary"
              size="large"
              onClick={handleMenu}
              startIcon={<AccountCircle />}
              sx={{ textTransform: "capitalize" }}
              aria-label={t("settings")}
            >
              {user.first_name} {user.last_name}
            </Button>
            <Menu
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogoutOpen();
                }}
                disableRipple
              >
                {t("logout")}
              </MenuItem>
            </Menu>
            <Dialog
              open={logoutOpen}
              onClose={handleLogoutClose}
              aria-labelledby="logout-dialog-title"
            >
              <DialogTitle id="logout-dialog-title">
                {t("logout_confirm")}
              </DialogTitle>
              <DialogContent />
              <DialogActions>
                <Button onClick={handleLogoutClose} color="inherit">
                  {t("cancel")}
                </Button>
                <Button
                  onClick={handleLogoutConfirm}
                  color="error"
                  variant="contained"
                >
                  {t("confirm")}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
