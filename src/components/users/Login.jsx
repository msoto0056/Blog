import React,{useState} from 'react';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';
//MaterialUI
import { useTheme } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useGlobalDispatch } from '../../context/GlobalStore';
import { useUserState, login} from '../../context/users/UserStore';
import { actions } from '../../context/Types';
import Notification from '../../layout/FormControlMaterialUI/Notification';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'



const url = `${process.env.REACT_APP_API_SERVER}`;

export default function Login() {
  const theme = useTheme();
  const { t, i18n } = useTranslation()
  // const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguageCode = i18n.language
  console.log("Language", currentLanguageCode)  
  const globalDispatch=useGlobalDispatch();
  const [{isAuthenticated},dispatch]=useUserState();
  const initialFormData = Object.freeze({
		email: '',
		password: '',
  });
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
	updateFormData({
	    ...formData,
	    [e.target.name]: e.target.value.trim(),
	  });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const msgPassLen = t("msg_pass_len")
    if (formData.password.length < 5 ) {
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
          {message: msgPassLen,isOpen:true, type:'error'}});    
    } else  login(formData,dispatch,globalDispatch)
  };

  
  


  const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${url}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${url}/auth/o/facebook/?redirect_uri=${url}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

  if (isAuthenticated) {
        return <Navigate to='/' replace />
  }
  return (
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t( "register_email_address")}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("register_password")}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("remember_me")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("sign_in")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={NavLink} to={'/resetPassw'} variant="body3">
                  {t("forgot_password")}
                </Link>
              </Grid>
              <Grid item>
                <Link component={NavLink} to={'/register'} variant="body3">
                  {t("Don't_have_an_account")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Notification />
      </Container>
  );
}

