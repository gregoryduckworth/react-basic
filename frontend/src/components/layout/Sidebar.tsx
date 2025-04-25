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
import { NavLink } from "react-router-dom";
import { navItems } from "../../config/navItems";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 64;

interface SidebarProps {
  collapsed?: boolean;
  navItems?: Array<{
    labelKey: string;
    href: string;
    icon: React.ReactNode;
    match: string[];
  }>;
}

const Sidebar = ({
  collapsed = false,
  navItems: navItemsProp,
}: SidebarProps) => {
  const { t } = useTranslation();
  const currentPath = window.location.pathname;
  const items = navItemsProp || navItems;

  return (
    <Box
      sx={{
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
        height: "100vh",
        zIndex: 1100,
        position: "relative",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <List sx={{ flex: 1, pb: 0 }} disablePadding>
        {items.map((item) => (
          <ListItem key={item.href} disablePadding sx={{ display: "block" }}>
            <Tooltip
              title={collapsed ? t(item.labelKey) : ""}
              placement="right"
            >
              <ListItemButton
                component={NavLink}
                to={item.href}
                sx={({ isActive }) => ({
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1 : 2,
                  bgcolor: isActive ? "primary.50" : undefined,
                  color: isActive ? "primary.main" : undefined,
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "primary.main" : undefined,
                  },
                  "&:hover": { bgcolor: "primary.100" },
                  minHeight: 48,
                })}
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
      <Box
        p={2}
        borderTop={1}
        borderColor="divider"
        textAlign={collapsed ? "center" : "inherit"}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {!collapsed && (
          <Typography variant="caption" color="text.secondary" align="center">
            &copy; {new Date().getFullYear()} HR Copilot
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default memo(Sidebar);
