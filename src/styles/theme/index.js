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
      text: {
        alternate: " #4682b4"
      }
    },
  });

  export default theme;