import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

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
