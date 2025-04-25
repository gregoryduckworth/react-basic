import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Box, Paper, Typography, TextField, Link } from "@mui/material";
import LoggedOutLayout from "../../components/layout/LoggedOutLayout";
import { register } from "../../services/auth";

function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(t("form.passwords_no_match"));
      return;
    }
    setLoading(true);
    try {
      await register({
        email,
        password,
        firstName,
        lastName,
      });
      setMessage(null);
      setLoading(false);
      navigate("/login", { state: { registered: true } });
    } catch (err: any) {
      setLoading(false);
      const errorKey =
        err?.message?.errorKey || err?.errorKey || err?.message || err;
      setMessage(t(`error.${errorKey}`));
    }
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
            {t("register.register_title")}
          </Typography>
          <Typography color="text.secondary" align="center">
            {t("register.register_subtitle")}
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
            onSubmit={handleRegister}
            aria-label={t("register.register_form_label")}
          >
            <TextField
              id="firstName"
              type="text"
              label={t("form.first_name")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="given-name"
              fullWidth
              size="medium"
            />
            <TextField
              id="lastName"
              type="text"
              label={t("form.last_name")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="family-name"
              fullWidth
              size="medium"
            />
            <TextField
              id="email"
              type="email"
              label={t("form.email")}
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
              label={t("form.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              fullWidth
              size="medium"
            />
            <TextField
              id="confirmPassword"
              type="password"
              label={t("form.confirm_password")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              fullWidth
              size="medium"
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? t("register.registering") : t("register.register")}
            </Button>
          </Box>
          {message && (
            <Typography
              color="error"
              fontWeight={500}
              align="center"
              role="alert"
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
            <Link href="/login" underline="hover" color="primary">
              {t("login.login_link")}
            </Link>
          </Box>
        </Paper>
      </Box>
    </LoggedOutLayout>
  );
}

export default memo(Register);
