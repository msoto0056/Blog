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
      ,
    }
    },
    typography: {
      fontFamily: ["Fauna One", "sans-serif","Montez","Roboto"].join(","),
      fontSize: 11,
      h1: {
        fontFamily: ["Cinzel", "sans-serif","Montez"].join(","),
        fontSize: 48,
      },
      h2: {
        fontFamily: ["Cinzel", "sans-serif","Montez"].join(","),
        fontSize: 36,
      },
      h3: {
        fontFamily: ["Cinzel", "sans-serif","Montez"].join(","),
        fontSize: 20,
      },
      h4: {
        fontFamily: ["Cinzel", "sans-serif","Montez"].join(","),
        fontSize: 14,
      },
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
      badgeProd1: {
        main: "#FFEFD5"
      },
      badgeProd: {
        main: "#78b8ed"
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
    styleOverrides: {
      MuiAccordionSummary: {
        root: {
          backgroundColor: ({ palette }) =>
            palette.mode === 'dark' ? palette.grey[700] : palette.grey[100],
        },
      },
      variants: [
        {
          props: { variant: 'customV1' },
          style: {
            backgroundColor: ({ palette }) =>
            palette.mode === 'dark' ? palette.grey[700] : palette.grey[100],
          },
        },
      ],
    },
  });

  export default theme;
