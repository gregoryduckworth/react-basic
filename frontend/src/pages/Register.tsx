import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { fetchApi } from "../services/api";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

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
      setMessage(t("passwords_no_match"));
      return;
    }
    setLoading(true);
    try {
      await fetchApi("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });
      setMessage(null);
      setLoading(false);
      navigate("/login", { state: { registered: true } });
    } catch (err: any) {
      setLoading(false);
      const errorKey =
        err?.message?.errorKey || err?.errorKey || err?.message || err;
      setMessage(t(errorKey));
    }
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
            {t("register_title")}
          </Typography>
          <Typography color="text.secondary" align="center">
            {t("register_subtitle")}
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
            aria-label={t("register_form_label")}
          >
            <TextField
              id="firstName"
              type="text"
              label={t("first_name", "First Name")}
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
              label={t("last_name", "Last Name")}
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
              autoComplete="new-password"
              fullWidth
              size="medium"
            />
            <TextField
              id="confirmPassword"
              type="password"
              label={t("confirm_password")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              fullWidth
              size="medium"
            />
            <Button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? t("registering") : t("register")}
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
            <Link href="/login" underline="hover" color="primary" fontSize={14}>
              {t("login_link")}
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register;
