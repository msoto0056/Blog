import React, {useState} from 'react'
import ReactTooltip from 'react-tooltip';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import Box from '@mui/material/Box';
import Map from "./Map"


import "./styles.css"

const theme = createTheme({
    components:{
      MuiTypography:{
        variants: [
          {
            props: {
              variant:"body3",
            },
              style: {
                fontSize:11,
              }
          },
          {
            props: {
              variant:"body4",
            },
              style: {
                fontSize:9,
              }
          }
        ]
      }
    }
  });

function Maps() {
  const[center, setCenter]=useState([0, 0]);
  const[content,setContent]=useState ("");
  console.log("maps")
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: "1rem 0", listStyle: 'none' }, textAlign: "center", alignItems: "center" }} />
        {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 1, listStyle: 'none' } }} /> */}
        <CssBaseline />
        <MuiContainer disableGutters maxWidth="sm" component="main" sx={{ pt: 2, pb: 3 }}>
          <Paper elevation={4}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Map 
            </Typography>
            <Typography
                component="h5"
                variant="body4"
                align="center"
                color="text.primary"
                gutterBottom
                >
                  {center}
            </Typography>
            <Box justifyContent={"center"}
              sx={{
                display:'flex',
                alignItems: 'center',
                align:'center',
                textAlign: 'center',
                pb:6,
                pt:1
              }}> 
              <Button onClick={() => setCenter([-55, -25])} variant={"outlined"}  size="small" 
                  startIcon={<FindReplaceIcon/>}>
                  <Typography
                    component="h3"
                    variant="body3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                  Euro-Asia
                </Typography>
              </Button>

              <Button onClick={() => setCenter([-15, 0])} variant={"outlined"}  size="small" 
                  startIcon={<FindReplaceIcon/>}>
                  <Typography
                    component="h3"
                    variant="body3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                  Africa
                </Typography>
              </Button>
              <Button onClick={() => setCenter([92.2093, -33.8688])} variant={"outlined"}  size="small" 
                  startIcon={<FindReplaceIcon/>}>
                  <Typography
                    component="h3"
                    variant="body3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                  North America
                </Typography>
              </Button>
              <Button onClick={() => setCenter([-123.7584, 9.7489])} variant={"outlined"}  size="small" 
                  startIcon={<FindReplaceIcon/>}>
                  <Typography
                    component="h3"
                    variant="body3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                  Oceania
                </Typography>
              </Button>
              <Button onClick={() => setCenter([66.9237, 30.0196])} variant={"outlined"}  size="small" 
                  startIcon={<FindReplaceIcon/>}>
                  <Typography
                    component="h3"
                    variant="body3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                  South America
                </Typography>
              </Button>
            </Box>
            <Map center={center} setTooltipContent={setContent}/>
            <ReactTooltip offset={{ top: 335, left: 45 }}>{content}</ReactTooltip>
          </Paper>
        </MuiContainer>
    </ThemeProvider>
);

}
export default Maps