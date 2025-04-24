import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

function ForgottenPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleForgotten(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessage(t("forgotten_password_sent"));
      setLoading(false);
    }, 800);
  }

  return (
    <Box
      minHeight="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f0f4fa"
      p={2}
    >
      <Link
        href="/"
        underline="hover"
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 50,
          bgcolor: "white",
          px: 2,
          py: 0.5,
          borderRadius: 1,
          boxShadow: 1,
          fontWeight: 700,
          color: "primary.main",
          fontSize: 20,
        }}
      >
        {t("homepage")}
      </Link>
      <Box
        width="100%"
        maxWidth={700}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          component="header"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          mb={4}
          px={2}
        >
          <Typography
            variant="h3"
            color="primary"
            fontWeight={800}
            align="center"
          >
            {t("forgotten_title")}
          </Typography>
          <Typography color="text.secondary" align="center">
            {t("forgotten_subtitle")}
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 400,
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
            onSubmit={handleForgotten}
            aria-label={t("forgotten_form_label")}
          >
            <TextField
              id="email"
              type="email"
              label={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              fullWidth
              size="medium"
            />
            <Button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? t("sending") : t("send_reset_link")}
            </Button>
          </Box>
          {message && (
            <Typography
              color="success.main"
              fontWeight={500}
              align="center"
              role="status"
            >
              {message}
            </Typography>
          )}
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            width="100%"
            textAlign="center"
          >
            <Link href="/login" underline="hover" color="primary" fontSize={14}>
              {t("login_link")}
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default ForgottenPassword;
