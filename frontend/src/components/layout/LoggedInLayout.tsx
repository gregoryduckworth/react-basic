import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  return (
    <Box
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
      <Box position="sticky" top={0} zIndex={1100} width="100%">
        {header}
      </Box>
      <Box display="flex" flexDirection="row" height="calc(100vh - 64px)">
        {sidebar && (
          <Box
            sx={{
              width: { xs: 0, sm: 200, md: 240 },
              minWidth: { sm: 200, md: 240 },
              bgcolor: theme.palette.grey[200],
              display: { xs: "none", sm: "block" },
              height: "100%",
              borderRight: `1px solid ${theme.palette.divider}`,
            }}
          >
            {sidebar}
          </Box>
        )}
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
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default LoggedInLayout;
