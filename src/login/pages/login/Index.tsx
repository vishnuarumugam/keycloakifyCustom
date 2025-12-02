import { PageProps } from "../../types";
import { Box, TextField, Typography, Grid2 as Grid, InputAdornment, IconButton } from "@mui/material";
import { HintBox } from "../../../components/HintBox";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { LOGO_IMAGES_PATH } from "../../../assets/logos";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = (props: PageProps<"login.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { i18n, Template, kcContext } = props;
  const { url, message, messagesPerField } = kcContext;
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const { msgStr } = i18n;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundImage: `url(${LOGO_IMAGES_PATH.ESDSLogo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: `'IBM Plex Sans', sans-serif`,
      }}
    >
      {/* Left Half - Banner Image */}
      <Box
        sx={{
          flex: 2,
        }}
      />

      {/* Right Half - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          padding: "80px 60px",
          backgroundColor: "#ffffff",
          boxShadow: "-6px 0 18px rgba(0,0,0,0.12)", // shadow toward left side
        }}
      >

        <Template i18n={i18n} kcContext={kcContext}>
          <Box sx={{ width: "100%", maxWidth: "420px" }}>

            {/* Logo */}
            <Box
              component="img"
              src={LOGO_IMAGES_PATH.AuthLogoBadge}
              alt="Auth Logo"
              sx={{
                width: 120,
                height: 120,
                marginBottom: "5px",
                objectFit: "contain",
              }}
            />

            {/* Page Title */}
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Single Sign-On
            </Typography>

            {/* Subtitle */}
            <Typography variant="subtitle1" sx={{ color: "#909090", mb: 4 }}>
              Log in to ESDS Cloud Platform.
            </Typography>

            {/* Login Form */}
            <form
              onSubmit={() => setLoading(true)}
              id="kc-form-login"
              action={url.loginAction}
              method="post"
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Typography sx={{ mb: 1 }}>
                    {msgStr("usernameOrEmail")}
                    <Typography component="span" sx={{ color: "#ef4444" }}> *</Typography>
                  </Typography>
                  <TextField

                    fullWidth
                    error={messagesPerField.existsError("username")}
                    label="Enter your username or email"
                    name="username"
                    id="username"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                      "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px white inset",
                        WebkitTextFillColor: "#000", // keep text color normal
                        caretColor: "#000",
                        borderRadius: "8px",
                      },
                    }}

                  />
                </Grid>

                <Grid size={12}>
                  <Typography sx={{ mb: 1 }}>
                    {msgStr("password")}
                    <Typography component="span" sx={{ color: "#ef4444" }}> *</Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    error={messagesPerField.existsError("password")}
                    label="Enter your password"
                    name="password"
                    id="password"
                    type={showLoginPassword ? "text" : "password"}
                    autoComplete="current-password"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                      "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px white inset",
                        WebkitTextFillColor: "#000", // keep text color normal
                        caretColor: "#000",
                        borderRadius: "8px",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowLoginPassword(prev => !prev)} edge="end">
                            {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    loading={loading}
                    type="submit"
                    sx={{
                      color: "#fff",
                      backgroundImage: "linear-gradient(60deg,#1755e7 60%,#812cd7 100%)",
                      "&:hover": { filter: "brightness(1.07)" },
                      mt: 3,
                      py: 1.3,
                      borderRadius: "8px",
                    }}
                  >
                    Sign In
                  </LoadingButton>
                </Grid>

                {message && (
                  <Grid size={12}>
                    <HintBox
                      style={{ marginTop: "10px", textAlign: "center" }}
                      type={message?.type === "success" ? "info" : message.type}
                      message={message.summary}
                    />
                  </Grid>
                )}
              </Grid>
            </form>

          </Box>
        </Template>
      </Box>
    </Box>
  );
};

export { Login };
