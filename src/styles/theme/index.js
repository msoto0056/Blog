import { createTheme} from '@mui/material/styles';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

// const theme = useTheme();
// const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
          },
          {
            props: {
              variant:"body5",
            },
              style: {
                fontSize:7,
              }
          }
        ]
      }
    },
    palette: {
      primary: {
        main: "#1976d2"
      },
      secondary: {
        main: "#9c27b0"
      },
      // augmentColor the standard palette colors.
      third: {
        main:  "#20d208"
      },
      fourth: {
        main:  "#919aa1"
      },
      badgeProd: {
        main: "#FFEFD5"
      },
      shoppingCart:{
        main: "#ffa430"
      },
      text: {
        success: "#0f5805",
        error: "#db3636",
        alternate: "#4682b4"
      }
    },
  });

  export default theme;