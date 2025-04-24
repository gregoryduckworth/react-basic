import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const theme = useTheme();

  const registered = location.state && location.state.registered;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) {
      setMessage(t("login_failed"));
      return;
    }
    setMessage(null);
    navigate("/dashboard");
  }

  return (
    <Box
      minHeight="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.background.default}
      p={2}
    >
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
            {t("login_title")}
          </Typography>
          <Typography color="text.secondary" align="center">
            {t("login_subtitle")}
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
          {registered && (
            <Typography color="success.main" align="center">
              {t("register_success")}
            </Typography>
          )}
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
            onSubmit={handleLogin}
            aria-label={t("login_form_label")}
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
            <TextField
              id="password"
              type="password"
              label={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              fullWidth
              size="medium"
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? t("logging_in") : t("login")}
            </Button>
          </Box>
          {message && (
            <Typography color="error" align="center" role="alert">
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
            <Link href="/forgotten-password" underline="hover" color="primary">
              {t("forgot_password_link")}
            </Link>
            <Link href="/register" underline="hover" color="primary">
              {t("register_link")}
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
