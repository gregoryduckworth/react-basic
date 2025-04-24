import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <Box
      width={240}
      minHeight="100vh"
      borderRight={1}
      borderColor="divider"
      display="flex"
      flexDirection="column"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/dashboard"
            selected={window.location.pathname === "/dashboard"}
          >
            <ListItemText
              primary={<Typography>{t("dashboard_title")}</Typography>}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default memo(Sidebar);
