import React, { useState } from "react";
import { useTheme, Box } from "@mui/material";

interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
}

interface LoggedInLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactElement<HeaderProps>;
  children: React.ReactNode;
}

function LoggedInLayout({ sidebar, header, children }: LoggedInLayoutProps) {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const headerWithProps =
    header && React.isValidElement<HeaderProps>(header)
      ? React.cloneElement(header, {
          onSidebarToggle: () => setSidebarCollapsed((v) => !v),
          sidebarCollapsed,
        })
      : null;

  return (
    <Box
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
      display="flex"
      flexDirection="column"
    >
      {/* Header (full width) */}
      <Box position="sticky" top={0} zIndex={1100} width="100%">
        {headerWithProps}
      </Box>
      {/* Main area: sidebar and content */}
      <Box display="flex" flexDirection="row" flex={1} minHeight={0}>
        {/* Sidebar under header, full height */}
        {sidebar && (
          <Box
            sx={{
              width: sidebarCollapsed ? 64 : 240,
              minWidth: sidebarCollapsed ? 64 : 240,
              transition: "width 0.2s",
              bgcolor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
              boxShadow: 1,
              display: { xs: "none", sm: "block" },
              height: "100vh",
              position: "relative",
              zIndex: 1100,
            }}
          >
            {React.cloneElement(
              sidebar as React.ReactElement<{ collapsed: boolean }>,
              {
                collapsed: sidebarCollapsed,
              }
            )}
          </Box>
        )}
        {/* Content */}
        <Box
          component="main"
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          p={{ xs: 2, md: 4 }}
          height="100%"
          overflow="auto"
          width="100%"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default LoggedInLayout;
