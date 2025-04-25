import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "@config/navItems";
import type { NavItem } from "@config/navItems";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const sidebarSx = (collapsed: boolean) => ({
  width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
  minWidth: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
  maxWidth: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  overflowX: "hidden",
  bgcolor: "background.paper",
  borderRight: 1,
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  boxShadow: 1,
  height: "100%",
  zIndex: 1100,
});

interface SidebarProps {
  collapsed?: boolean;
  navItems?: NavItem[];
}

const Sidebar = ({
  collapsed = false,
  navItems: navItemsProp,
}: SidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const items = navItemsProp || navItems;

  return (
    <Box sx={sidebarSx(collapsed)} aria-label="Sidebar navigation">
      <List sx={{ flex: 1 }}>
        {items.map((item) => (
          <ListItem key={item.href} disablePadding sx={{ display: "block" }}>
            <Tooltip
              title={collapsed ? t(item.labelKey) : ""}
              placement="right"
            >
              <ListItemButton
                component={NavLink}
                to={item.href}
                selected={location.pathname.startsWith(item.href)}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1 : 2,
                  minHeight: 48,
                  "&.Mui-selected, &.Mui-selected:hover": {
                    bgcolor: "primary.50",
                    color: "primary.main",
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                  },
                  "&:hover": { bgcolor: "primary.100" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={
                      <Typography fontWeight={600}>
                        {t(item.labelKey)}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Sidebar);
