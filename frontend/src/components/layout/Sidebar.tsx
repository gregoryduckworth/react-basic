import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <nav aria-label="Main sidebar navigation">
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/dashboard"
            selected={window.location.pathname === "/dashboard"}
          >
            <ListItemText
              primary={
                <Typography fontWeight={600} color="primary">
                  {t("dashboard_title")}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};

export default memo(Sidebar);
