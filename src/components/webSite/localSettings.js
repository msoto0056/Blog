import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import {theme} from '../../layout/myTheme';


function LocalSettings() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <MuiContainer disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
            <Paper elevation ={24} > 
                <Typography component="h1"
                    variant="h2"
                    align="center"
                    color="text.alternate"
                    gutterBottom 
                    sx={{padding:3}}
                > 
                    Local Settings
                </Typography>
            </Paper>
        </MuiContainer>
    </ThemeProvider>
  )
  
}

export default LocalSettings