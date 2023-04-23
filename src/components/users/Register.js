import React, { useState }  from 'react';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';
//MaterialUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useGlobalStore,useGlobalDispatch } from '../../context/GlobalStore';
import { useUserState, signup } from '../../context/users/UserStore';
import { useTheme } from "@mui/material/styles";
import { actions } from '../../context/Types';
import Notification from '../../layout/FormControlMaterialUI/Notification';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';

const url = `${process.env.REACT_APP_API_SERVER}`;

export default function SignUp() {
  const theme = useTheme();
  const { t, i18n } = useTranslation()
  // const currentLanguageCode = cookies.get('i18next') || 'en'
  const msgPassLen = t('msg_pass_len');
  const msgPassMat = t('msg_pass_mat');
  const globalDispatch=useGlobalDispatch();
  const {languages} = useGlobalStore()
  const [{user,isAuthenticated,isAccountCreated},dispatch]=useUserState();
  const initialFormData = Object.freeze(user);
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    if (e.target.name === 'idiom') {
      i18n.changeLanguage(e.target.value)
    }
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),

		});
	};
  const handleSubmit = (e) => {
    e.preventDefault();
    cookies.set('django_language', formData.idiom)
    if (formData.password === formData.re_password) {
      if (formData.password.length < 8 ) {
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
          {message: msgPassLen,isOpen:true, type:'error'}});    
      } else  signup(formData,dispatch,globalDispatch)
    } else globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
        {message: msgPassMat,isOpen:true, type:'error'}});  
  }
    
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
        return <Navigate to='/' replace/>
    }
    if (isAccountCreated) {
        return <Navigate to='/login' replace />
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
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("register_title")}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t( "register_email_address")}
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label={t("register_user_name")}
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t("register_first_name")}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("register_last_name")}
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t("register_password")}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="re_password"
                  label={t("register_re_password")}
                  type="password"
                  id="re_password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="idiom"
                  name="idiom"
                  select
                  label={t("register_idiom")}
                  onChange={handleChange}
                  helperText={t("register_idiom_msg")}
                >
                  {languages.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    <ListItemIcon> {option.iconFlag}</ListItemIcon>
                    <ListItemText>{option.name}</ListItemText>
                  </MenuItem>
                ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" size="small" />}
                  label={<Typography variant="body3" color="textSecondary"> {t("register_check_box")}</Typography> }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              {t("register_button")}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={NavLink} to={"/login"} variant="body3">
                  {t("register_already_have_account")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Notification />
      </Container>
   );
}