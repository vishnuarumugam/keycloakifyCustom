import { PageProps } from "../../types";
import { Box, Typography, Grid2 as Grid, TextField, Checkbox, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import { HintBox } from "../../../components/HintBox";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { LOGO_IMAGES_PATH } from "../../../assets/logos";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const LoginUpdatePassword = (props: PageProps<"login-update-password.ftl">) => {
    const { Template, i18n, kcContext } = props;
    const { msgStr } = i18n;
    const { url, messagesPerField, isAppInitiatedAction, message } = kcContext;
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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

            {/* Right Panel Content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: "60px",
                    bgcolor: "#ffffff",
                    boxShadow: "-6px 0 18px rgba(0,0,0,0.12)",
                }}
            >
                <Template {...props}>
                    <Box sx={{ width: "100%", maxWidth: "420px" }}>

                        {/* Logo */}
                        <Box
                            component="img"
                            src={LOGO_IMAGES_PATH.AuthLogoBadge}
                            alt="Logo"
                            sx={{ width: 110, mb: 1 }}
                        />


                        {/* Title */}
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                            {msgStr("updatePasswordTitle") || "Update your password"}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "#707070", mb: 4 }}>
                            Please create a new password to secure your account.
                        </Typography>

                        {/* Show Keycloak messages */}
                        {message && (
                            <HintBox
                                style={{ marginBottom: "16px" }}
                                type={message.type}
                                message={message.summary}
                            />
                        )}

                        {/* Form */}
                        <form id="kc-passwd-update-form" action={url.loginAction} method="post"
                            onSubmit={() => setLoading(true)}
                        >
                            <Grid container spacing={2}>

                                {/* New Password */}
                                <Grid size={12}>
                                    <Typography sx={{ mb: 1 }}>
                                        {msgStr("passwordNew")}
                                        <Typography component="span" sx={{ color: "#ef4444" }}> *</Typography>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Enter new password"
                                        name="password-new"
                                        type={showNewPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        error={messagesPerField.existsError("password")}
                                        helperText={messagesPerField.getFirstError("password")}
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
                                                    <IconButton onClick={() => setShowNewPassword(prev => !prev)} edge="end">
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Confirm Password */}
                                <Grid size={12}>
                                    <Typography sx={{ mb: 1 }}>
                                        {msgStr("passwordConfirm")}
                                        <Typography component="span" sx={{ color: "#ef4444" }}> *</Typography>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Enter confirm password"
                                        name="password-confirm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        error={messagesPerField.existsError("password-confirm")}
                                        helperText={messagesPerField.getFirstError("password-confirm")}
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
                                                    <IconButton onClick={() => setShowConfirmPassword(prev => !prev)} edge="end">
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Logout Other Sessions Checkbox (if enabled) */}
                                {isAppInitiatedAction && (
                                    <Grid size={12}>
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked name="logout-sessions" />}
                                            label={msgStr("logoutOtherSessions")}
                                        />
                                    </Grid>
                                )}

                                {/* Submit Buttons */}
                                <Grid size={12}>
                                    <LoadingButton
                                        fullWidth
                                        variant="contained"
                                        loading={loading}
                                        type="submit"
                                        sx={{
                                            mt: 3,
                                            py: 1.4,
                                            color: "#ffffff",
                                            fontWeight: 600,
                                            borderRadius: "6px",
                                            backgroundImage: "linear-gradient(60deg,#1755e7 60%,#812cd7 100%)",
                                            "&:hover": { filter: "brightness(1.07)" },
                                        }}
                                    >
                                        {msgStr("doSubmit")}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Template>
            </Box>
        </Box>
    );
};

export { LoginUpdatePassword };
