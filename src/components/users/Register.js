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
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGlobalDispatch } from '../../context/GlobalStore';
import { useUserState, signup } from '../../context/users/UserStore';
import { actions } from '../../context/Types';
import Notification from '../../layout/FormControlMaterialUI/Notification';

const theme = createTheme();
const url = `${process.env.REACT_APP_API_SERVER}`;
const msgPassLen = 'The password length most be at least 8 Characters long';
const msgPassMat = 'The passwords you entered  do not match';

export default function SignUp() {
  const globalDispatch=useGlobalDispatch();
  const [{user,isAuthenticated,isAccountCreated},dispatch]=useUserState();
  const initialFormData = Object.freeze(user);
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};
  const handleSubmit = (e) => {
    e.preventDefault();
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
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
                  label="User Name"
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
                  label="First Name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
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
                  label="Password"
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
                  label="Confirm Password"
                  type="password"
                  id="re_password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" size="small" />}
                  label={<Typography variant="caption" color="textSecondary">I want to receive inspiration, marketing promotions and updates via email.</Typography> }
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={NavLink} to={"/login"} variant="caption">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Notification />
      </Container>
    </ThemeProvider>
  );
}