import { PageProps } from "../../types";
import { Box, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LOGO_IMAGES_PATH } from "../../../assets/logos";
import { useState } from "react";

const LoginOtp = (props: PageProps<"login-otp.ftl">) => {
    const { Template, i18n, kcContext } = props;
    const { url, messagesPerField, message } = kcContext;
    const [loading, setLoading] = useState(false);

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
            <Box sx={{ flex: 2 }} />

            {/* Right content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    padding: "80px 60px",
                    backgroundColor: "#ffffff",
                    boxShadow: "-6px 0 18px rgba(0,0,0,0.12)",
                }}
            >
                <Template i18n={i18n} kcContext={kcContext}>
                    <Box sx={{ maxWidth: "420px", width: "100%" }}>
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

                        {/* Header */}
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                            {"Mobile Authenticator Verification"}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ mb: 3, color: "#707070" }}>
                            Enter the one-time passcode sent to your registered device to complete the login.
                        </Typography>

                        {/* Error message (if any) */}
                        {message && (
                            <Typography sx={{ color: "red", mb: 2 }}>
                                {message.summary}
                            </Typography>
                        )}

                        {/* OTP Input Form */}
                        <form
                            id="kc-otp-login-form"
                            action={url.loginAction}
                            method="post"
                            onSubmit={() => setLoading(true)}
                        >
                            {/* If there are multiple OTP credentials, include this hidden field */}
                            {kcContext.otpLogin?.selectedCredentialId && (
                                <input
                                    type="hidden"
                                    name="selectedCredentialId"
                                    value={kcContext.otpLogin.selectedCredentialId}
                                />
                            )}

                            {/* OTP Label */}
                            <Typography sx={{ mb: 1 }}>
                                One-time code <Typography component="span" color="error">*</Typography>
                            </Typography>

                            {/* OTP Input Field */}
                            <TextField
                                id="otp"   // Required
                                name="otp" // Required
                                fullWidth
                                label="Enter one-time code"
                                inputProps={{ maxLength: 6, style: { textAlign: "left" } }}
                                error={messagesPerField.existsError("totp")}
                                helperText={messagesPerField.getFirstError("totp")}
                                sx={{
                                    "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                                    "& input:-webkit-autofill": {
                                        WebkitBoxShadow: "0 0 0 100px white inset",
                                        WebkitTextFillColor: "#000",
                                        caretColor: "#000",
                                        borderRadius: "8px",
                                    },
                                }}
                            />

                            {/* Submit Button */}
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
                                Submit
                            </LoadingButton>
                        </form>

                    </Box>
                </Template>
            </Box>
        </Box>
    );
};

export { LoginOtp };
