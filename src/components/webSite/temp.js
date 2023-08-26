import React from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import MuiContainer from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useDisclosure } from '../../custom-hooks/useDisclosure';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

const Temp = () => {
    console.log ('Temp')
  return (
    <React.Fragment>
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
                  Testing
                </Typography>
                <Example />
            </Paper>
        </MuiContainer>
    </React.Fragment>
  )

}

export default Temp

function Example() {

    const { isOpen, onOpen, onClose } = useDisclosure()
      return (
       <>
  
        <Button onClick={onOpen}>Open Drawer</Button>
  
        <Drawer anchor='right' onClose={onClose} isOpen={isOpen}>
  
              <p>Some contents 1...</p>
  
              <p>Some contents 2...</p>
  
              <p>Some contents 3 ...</p>
  
        </Drawer>
  
      </>
  
    )
  
  }