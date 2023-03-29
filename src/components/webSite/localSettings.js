import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import MuiContainer from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';



function LocalSettings() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
  
}

export default LocalSettings