import React, { useState } from "react";
import { useTheme, Box, Typography } from "@mui/material";

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

  const HEADER_HEIGHT = 64;
  const SIDEBAR_WIDTH = sidebarCollapsed ? 64 : 240;

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        zIndex={1300}
        height={HEADER_HEIGHT}
        bgcolor={theme.palette.background.default}
      >
        {headerWithProps}
      </Box>
      {sidebar && (
        <Box
          sx={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: SIDEBAR_WIDTH,
            minWidth: SIDEBAR_WIDTH,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            bgcolor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: 1,
            display: { xs: "none", sm: "block" },
            zIndex: 1200,
            transition: "width 0.2s",
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
      <Box
        component="main"
        sx={{
          position: "absolute",
          top: `${HEADER_HEIGHT}px`,
          left: { sm: `${SIDEBAR_WIDTH}px` },
          width: { sm: `calc(100vw - ${SIDEBAR_WIDTH}px)` },
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflow: "auto",
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          transition:
            "left 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 24,
            pointerEvents: "none",
          }}
        >
          <Typography variant="caption" color="text.secondary" align="right">
            &copy; {new Date().getFullYear()} HR Copilot
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default LoggedInLayout;
