import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';

const theme = createTheme()

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
                    color="text.primary"
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