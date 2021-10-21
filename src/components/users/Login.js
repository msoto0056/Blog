import React,{useState} from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGlobalDispatch } from '../../context/GlobalStore';
import { useUserState, login} from '../../context/users/UserStore';
import { actions } from '../../context/Types';
import Notification from '../../layout/FormControlMaterialUI/Notification';


const theme = createTheme();
const url = `${process.env.REACT_APP_API_SERVER}`;
const msgPassLen = 'The password length most be at least 8 Characters long';

export default function SignIn() {
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
    if (formData.password.length < 8 ) {
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
        return <Redirect to='/' />
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
              label="Email Address"
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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

