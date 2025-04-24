import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface LoggedInLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({
  sidebar,
  header,
  children,
}) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      width="100%"
      bgcolor="#f0f4fa"
    >
      <Paper
        elevation={2}
        square
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 2,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {header}
      </Paper>
      <Box display="flex" flex={1} overflow="hidden" width="100%">
        <Paper
          elevation={1}
          square
          sx={{
            width: 256,
            display: { xs: "none", md: "block" },
            p: 2,
            minHeight: "calc(100vh - 64px)",
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          {sidebar}
        </Paper>
        <Box flex={1} p={{ xs: 2, md: 4 }} overflow="auto" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default LoggedInLayout;
