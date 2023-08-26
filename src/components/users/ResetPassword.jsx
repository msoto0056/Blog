import React,{useState} from 'react';
import { Navigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { actions } from '../../context/Types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGlobalDispatch } from '../../context/GlobalStore';
import { useUserState, resetPassword} from '../../context/users/UserStore';
import Notification from '../../layout/FormControlMaterialUI/Notification';
import { useTranslation } from 'react-i18next'
// import i18next from 'i18next'
import cookies from 'js-cookie'

const theme = createTheme();


export default function ResetPassword() {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const { t } = useTranslation()
  const globalDispatch=useGlobalDispatch();
  const [,dispatch]=useUserState();
  const initialFormData = Object.freeze({
		email: '',
  });
  const [requestSent, setRequestSent] = useState(false);
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
	updateFormData({
	    ...formData,
	    [e.target.name]: e.target.value.trim(),
	  });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(formData,dispatch,globalDispatch)
    setRequestSent(true);
  };


  if (requestSent) {
        return <Navigate to='/' replace />
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
            <LockResetOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('sign_in')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("register_email_address")}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("reset_password")}
            </Button>
          </Box>
        </Box>
        <Notification />
      </Container>
    </ThemeProvider>
  );
}

