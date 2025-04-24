import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

interface LoggedOutLayoutProps {
  children: React.ReactNode;
}

const LoggedOutLayout: React.FC<LoggedOutLayoutProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      minHeight="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.background.default}
    >
      {children}
    </Box>
  );
};

export default LoggedOutLayout;
