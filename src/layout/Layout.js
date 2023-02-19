import React from 'react'
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';


const Layout = ({children}) => {
 
   const [state, setState] = React.useState(false);  // Drawer Status

   console.log({Outlet})
  return (
    <React.Fragment> 
        <Drawer state = {state} setState={setState}/>
        <Header setState={setState}/>
        <Container maxWidth="md" sx={{mt:5}}>
        <Box
        //   sx={{ display: 'flex', mt:5, bgcolor: '#cfe8fc' }}
          sx={{
          mb: 2,
          pt: 3,
          display: "flex",
          flexDirection: "column",
          height: 900,
          overflow: "hidden",
          overflowY: "auto",
         // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
          component="main">
            {children}
            <Footer />
        </Box>
        </Container>
    </React.Fragment> 

  )
}

export default Layout