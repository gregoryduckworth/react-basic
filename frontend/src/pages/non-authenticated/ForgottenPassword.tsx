import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Paper, Typography, Button, Link, TextField } from "@mui/material";
import LoggedOutLayout from "../../components/layout/LoggedOutLayout";

function ForgottenPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleForgotten(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessage(t("forgottenPassword.forgotten_password_sent"));
      setLoading(false);
    }, 800);
  }

  return (
    <LoggedOutLayout>
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
            {t("forgottenPassword.forgotten_title")}
          </Typography>
          <Typography color="text.secondary" align="center">
            {t("forgottenPassword.forgotten_subtitle")}
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
            aria-label={t("forgottenPassword.forgotten_form_label")}
          >
            <TextField
              type="email"
              label={t("form.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              fullWidth
              size="medium"
            />
            <Button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              variant="contained"
            >
              {loading
                ? t("forgottenPassword.sending")
                : t("forgottenPassword.send_reset_link")}
            </Button>
          </Box>
          {message && (
            <Typography color="success.main" align="center" role="alert">
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
            <Link href="/login" underline="hover" color="primary">
              {t("login.login_link")}
            </Link>
          </Box>
        </Paper>
      </Box>
    </LoggedOutLayout>
  );
}

export default React.memo(ForgottenPassword);
