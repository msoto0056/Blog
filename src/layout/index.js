import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from './drawer';
import Header from './Header';
import Footer from './Footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../styles/theme";


const Layout = ({children}) => {

  return (
    <ThemeProvider theme={theme}> 
        <Drawer />
        <Header />
        {/* <Container maxWidth="md" sx={{mt:5}}> */}
        <Container maxWidth="xl" disableGutters sx={{mt:5}}>
        <Box
        //   sx={{ display: 'flex', mt:5, bgcolor: '#cfe8fc' }}
          sx={{ mb: 2, mt: 5, pt: 3, display: 'flex', flexDirection: "column", height: 900, overflow: "hidden", overflowY: "auto",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
          }}
          component="main">
            {children}
            <Footer />
        </Box>
        </Container>
    </ThemeProvider>

  )
}

export default Layout