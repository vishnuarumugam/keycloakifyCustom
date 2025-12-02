import { Box } from '@mui/material'
import { CustomTemplateProps } from './types'
import { LOGO_IMAGES_PATH } from '../assets/logos'

const Template = (props: CustomTemplateProps<"login.ftl">) => {
  const { children } = props

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box maxWidth="400px" minWidth="400px">
        {children}
      </Box>
    </Box>
  )
}

const TemplateLoginTotp = (props: CustomTemplateProps<"login-config-totp.ftl">) => {
  const { children } = props

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bgcolor="#ffffff">
      <Box
        maxWidth="520px"
        minWidth="520px"
        sx={{
          padding: "32px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

const TemplateUpdatePassword = (props: CustomTemplateProps<"login-update-password.ftl">) => {
  const { children } = props

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#ffffff"
    >
      <Box
        maxWidth="500px"
        minWidth="500px"
        sx={{
          padding: "36px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const TemplateLoginOtp = (props: CustomTemplateProps<"login-otp.ftl">) => {
  const { children } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#ffffff"
    >
      <Box
        maxWidth="460px"
        minWidth="460px"
        sx={{
          padding: "32px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};


const TemplateCommon = (props: CustomTemplateProps<any>) => {
  const { children } = props;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${LOGO_IMAGES_PATH.ESDSLogo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          maxWidth: "480px",
          padding: "48px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};


export { Template, TemplateLoginTotp, TemplateUpdatePassword, TemplateLoginOtp, TemplateCommon };
