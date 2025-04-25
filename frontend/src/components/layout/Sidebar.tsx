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
  Divider,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

const navItems = [
  {
    labelKey: "dashboard_title",
    href: "/dashboard",
    icon: <DashboardIcon fontSize="small" />,
    match: ["/dashboard"],
  },
  {
    labelKey: "profile",
    href: "/profile",
    icon: <PersonIcon fontSize="small" />,
    match: ["/profile"],
  },
];

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const Sidebar = ({ collapsed = false }: { collapsed?: boolean }) => {
  const { t } = useTranslation();
  const currentPath = window.location.pathname;

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
        height: "100%",
        zIndex: 1100,
      }}
    >
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding sx={{ display: "block" }}>
            <Tooltip
              title={collapsed ? t(item.labelKey) : ""}
              placement="right"
            >
              <ListItemButton
                component="a"
                href={item.href}
                selected={item.match.includes(currentPath)}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1 : 2,
                  "&.Mui-selected": {
                    bgcolor: "primary.50",
                    color: "primary.main",
                    "& .MuiListItemIcon-root": { color: "primary.main" },
                  },
                  "&:hover": {
                    bgcolor: "primary.100",
                  },
                  minHeight: 48,
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
      <Box
        p={2}
        borderTop={1}
        borderColor="divider"
        textAlign={collapsed ? "center" : "inherit"}
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
