import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { slideInBottom, slideInRight } from "../../animation";
import Icon from '@mui/material/Icon';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

 
  export const SquareAvatar = styled(Avatar)(({ theme }) => ({
    borderRadius: '8px', // Adjust the border radius to your preference
    width: '64px', // Adjust the width and height to your preference
    height: '64px',
  }));

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
    background: '#ffc300',
    fontSize: "10px",
    cursor: "pointer",
    margin: 4,
    padding: '5px 8px',
    borderRadius: '25px',
    border: 'none',
    transition: 'all 0.2s ease-in',
    }));

  export const CartWrapper = styled(Box) (() => ({
    display: "flex",
    position: 'fixed',
    marginTop: '30px',
    top: '60px',
    right: '20px',
    borderRadius: '12px',
    backgroundColor: 'white',
    border: '1px solid gray',
    padding: '10px',
    zIndex: '10'
    }));


  export const CloseCartIcon = styled(Icon)(() => ({
    color: '#800000',
    transition: 'transform 0.2s linear',
    textAlign: "right",
    alignContent:'right',
    marginLeft:'auto',
    cursor: "pointer",
    ariaHidden: 'true',
    '&:hover': {
      transform: 'rotate(90deg)',
      boxShadow: 'none',
      color: 'red'
    }
  }));

  export const ShoppingBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 4,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 2px',
    },
  }));
  
  export const IncDecWrapper = styled(Box)(({ theme }) => ({
    background: `${theme.palette.background.paper}`,
    fontSize: "10px",
    cursor: "pointer",
    margin: 4,
    padding: '0.7px 8px',
    borderRadius: '20px',
    border: '1px solid #C0C0C0',   
    }));