import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {theme} from '../../layout/myTheme';


function AnyPage() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <MuiContainer disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Paper elevation={4}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Any New Page
            </Typography>
            <Box
            sx={{
              display:'flex',
              alignItems: 'center',
            }}> 
              <Typography variant="body3">
                Body 3
              </Typography>
            </Box>
            <Box
            sx={{
              display:'flex',
              alignItems: 'center',
            }}> 
              <Typography variant="body4">
                Body 4
              </Typography>
            </Box>
          </Paper>
        </MuiContainer>
    </ThemeProvider>
  )
  
}

export default AnyPage