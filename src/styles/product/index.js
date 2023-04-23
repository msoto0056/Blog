import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { slideInBottom, slideInRight } from "../../animation";

 
  export const ProductImageContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      padding: "100px 0px 100px 0px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 0px 50px 0px",
    marginTop:"10px",
    overflow: "hidden",
  }));

  export const ProductImage = styled ("img")(({ theme }) => ({
  width: '120%',
  height: '120%',
  ObjectFit: 'cover',
  }));

  export const ProductImage1 = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "100%",
    background: "rgb(230,230,230)",
    padding: '5px',
    [theme.breakpoints.down("md")]: {
      width: "90%", 
      padding: '5px',
    },
  }));

  export const PromotionsContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      padding: "20px 0px 20px 0px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px 0px 15px 0px",
    marginTop:"20px",
    overflow: "hidden",
    background: "#75adc7",
  }));
  
  export const MessageText = styled(Typography)(({ theme }) => ({
       fontFamily: '"Roboto[300]", "italic"',
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
    color: "#000",
    fontSize: "1.5rem",
  }));

  export const ProductViewButton1 = styled(Button, {
    shouldForwardProp: (prop) => prop !== "show",
  })(({ show, theme }) => ({
    width: "120px",
    fontSize: "12px",
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      position: "absolute",    
      bottom: "2%",
      width: "300px",
      padding: "10px 5px",
      animation:
        show &&
        `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    },
    background: '#ffa430',
    opacity: 0.9,
  }));

  export const ProductViewButton = styled(Button)(() => ({
    background: '#ffa430',
    fontSize: "10px",
    cursor: "pointer",
    margin: 4,
    padding: '5px 8px',
    borderRadius: '25px',
    border: 'none',
    transition: 'all 0.2s ease-in',
    }));

  