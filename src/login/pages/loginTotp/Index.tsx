import { PageProps } from "../../types";
import { Box, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LOGO_IMAGES_PATH } from "../../../assets/logos";
import { useState } from "react";

const LoginConfigTotp = (props: PageProps<"login-config-totp.ftl">) => {
    const { Template, i18n, kcContext } = props;
    const { msgStr } = i18n;
    const { url, totp, mode } = kcContext;
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
            <Box
                sx={{
                    flex: 2,
                }}
            />

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
                    boxShadow: "-6px 0 18px rgba(0,0,0,0.12)", // shadow toward left side
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
                            {msgStr("loginTotpTitle")}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ mb: 3 }}>
                            {msgStr("loginTotpIntro")}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ mb: 1, color: "#707070" }}>
                            1.{msgStr("loginTotpStep1")}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                            Free OTP
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                            Microsoft Authenticator
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 2, mb: 3 }}>
                            Google Authenticator
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: "#707070" }}>
                            2.{msgStr("loginTotpStep2")}
                        </Typography>

                        {/* QR or manual mode */}
                        {mode !== "manual" ? (
                            <Box sx={{ textAlign: "left", mb: 3 }}>
                                <img
                                    src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                    alt="QR Code"
                                    style={{ width: "200px", height: "200px" }}
                                />
                                <Typography sx={{ ml: 2 }}>
                                    <a href={totp.manualUrl}>{msgStr("loginTotpUnableToScan")}</a>
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                <Typography sx={{ fontWeight: 600, ml: 2 }}>Secret Key:</Typography>
                                <Typography sx={{ fontWeight: 600, ml: 2 }}>{totp.totpSecretEncoded}</Typography>
                                <Typography sx={{ ml: 2 }}>
                                    <a href={totp.qrUrl}>{msgStr("loginTotpScanBarcode")}</a>
                                </Typography>
                            </Box>
                        )}

                        <Typography variant="subtitle1" sx={{ mb: 1, color: "#707070" }}>
                            3.{msgStr("loginTotpStep3")}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ ml: 1, mb: 3, color: "#707070" }}>
                            {msgStr("loginTotpStep3DeviceName")}
                        </Typography>

                        {/* MFA Form */}
                        <form
                            id="kc-totp-settings-form"
                            action={url.loginAction}
                            method="post"
                            onSubmit={() => setLoading(true)}
                        >
                            {/* Required Hidden Fields */}
                            <input type="hidden" id="totpSecret" name="totpSecret" value={kcContext.totp.totpSecret} />
                            {kcContext.mode && <input type="hidden" id="mode" name="mode" value={kcContext.mode} />}

                            {/* OTP Code Input */}
                            <Typography sx={{ mb: 1 }}>
                                One-time code <Typography component="span" color="error">*</Typography>
                            </Typography>
                            <TextField
                                id="totp"
                                name="totp"
                                label="Enter One-time code"
                                fullWidth
                                inputProps={{ maxLength: 6 }}
                                required
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" }, mb: 3 }}
                            />

                            {/* Device name */}
                            <Typography sx={{ mb: 1 }}>Device Name</Typography>
                            <TextField
                                fullWidth
                                label="Enter device name"
                                name="userLabel"
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                            />

                            <LoadingButton
                                fullWidth
                                variant="contained"
                                loading={loading}
                                type="submit"
                                sx={{
                                    mt: 3,
                                    py: 1.3,
                                    borderRadius: "8px",
                                    color: "#fff",
                                    backgroundImage: "linear-gradient(60deg,#1755e7 60%,#812cd7 100%)",
                                }}
                            >
                                {msgStr("doSubmit")}
                            </LoadingButton>
                        </form>

                    </Box>
                </Template>
            </Box>
        </Box>
    );
};

export { LoginConfigTotp };
