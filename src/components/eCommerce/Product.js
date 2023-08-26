import React, {useState, useEffect} from 'react';
import { useProductState} from '../../context/eCommerce/ProductStore';
//MaterialUI
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import {ProductImageContainer, ProductImage1} from '../../styles/product';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import {actions} from '../../context/Types';
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip';
import IncDec from './QtyButton';


import Avatar from '@mui/material/Avatar';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function Product() {
  const { t } = useTranslation()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [{product,cartItems, selectedCategory},dispatch] = useProductState();

  useEffect(() => {
    // Update product qty if product is in the cart already - before writing the cart to the DB
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      const newQty = product.qty - existingItem.count;
      dispatch({ type: actions.UPDATE_CART, payload: newQty });
    }
  },  [cartItems, dispatch, product.id, product.qty]);
  

  const [selectedPicture, setSelectedPicture] = useState(product.image);
  function handleClick() {
    navigate(-1); // go back to the previous page
  }

  const categoryLetter = selectedCategory && typeof selectedCategory.category === 'string' ? selectedCategory.category.charAt(0).toUpperCase() : 'A';

	return (
        <Box sx={{ flexGrow: 1 , margin:1}}>
            <Grid2 container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {!matches && (
                <ImageList sx={{ width: {xs:70, sm:70, md:80}, height: {xs:350, sm:450, md:500 }, rowHeight: {xs:50, sm:55,  md:60} }} cols={1} >   
                    {product.productImages.map((image,i) => (
                        <ImageListItem key={i} sx={{border:1, borderColor:'#cccdd1'}}>  
                            <img
                            src={`${image.pictures}?w=150&h=164&fit=crop&auto=format`}
                            srcSet={`${image.picture}?w=150&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={''}
                            loading="lazy"
                            onClick={()=>setSelectedPicture(image.pictures)}
                            />
                    </ImageListItem>
                    ))}
                </ImageList>
            )}
            {!matches && (
                <Grid2 lg={1} md={2} sm={3} sx={4}>
                    <ProductImageContainer> 
                        <ProductImage1 src={selectedPicture} />    
                    </ProductImageContainer>
                </Grid2>
            )}
               <Grid2 lg={1} md={2} sm={3}  xs={4}
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  }}
                >
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="Category">
                        {categoryLetter}
                        </Avatar>
                    }
                        title= {product.title}
                        subheader= {`$ ${product.price}`}
                    />
                    <CardMedia
                      sx={{
                        paddingTop: '75%', // Increase the paddingTop value to make the image larger
                        backgroundSize: 'cover', // Use 'cover' to fill the entire area without cropping
                        backgroundImage: `url(${(product.image !== null) ? product.image : "https://source.unsplash.com/random"})`,
                      }}
                        title={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description.substr(0, 60)}...
                        </Typography>
                    </CardContent>
                    <CardActions sx={{justifyContent:'space-between'}}>
                        <Tooltip title={t("add2CartMsg")} color='primary'>
                            <span> 
                                <IconButton size="large" color= "primary"
                                disabled={parseInt(product.qty) === 0}
                                onClick ={() => {
                                    dispatch({ type: actions.ADD_TO_CART, payload: {product} });
                                    dispatch({ type: actions.UPDATE_QUANTITY });
                                    navigate(-1);
                                    }} > 
                                    <AddShoppingCartOutlinedIcon fontSize='large'/>
                                </IconButton>
                            </span>
                        </Tooltip>
                        <IncDec/>
                        <Button size="small" onClick={handleClick} variant={"outlined"} > 
                        <Typography variant="body3">
                            {t('returnMsg')}
                          </Typography>
                        </Button>
                    </CardActions>
                    <Stack spacing={1}>
                        <Rating name="half-rating"  size="small"  defaultValue={2.5} value={Number(product.rating)} precision={0.25} sx={{mt:1, mb:2}}/>
                    </Stack>
                </Card>
                </Grid2> 
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid2 lg={1} md={2} sm={3}  xs={4}
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                  }}
                >

                    <Typography
                        component="h2"
                        variant={matches ? "h5" : "h4"} 
                        color="text.primary"
                        gutterBottom
                    >
                        {product.title} 
                    </Typography>
                    <Typography
                        component="h3"
                        variant={matches ? "h6" : "h5"} 
                        color="text.primary"
                        gutterBottom
                    >
                        {`$ ${product.price}`}
                    </Typography>
                    <Typography
                        component="h3"
                        variant={matches ? "subtitle2" : "subtitle1"} 
                        color={product.qty >0 ? "text.success": "text.error" }
                        gutterBottom
                        sx= {{ alignSelf:'flex-start'}}
                    >
                        {product.qty > 0 ? `${t('inStockMsg')}: ${parseInt(product.qty)}` : t('outofStockMsg')}
                        {/* {product.qty > 0 ? `${t('inStockMsg')}: ${Number.isInteger(product.qty) ? 
                            product.qty : product.qty.toFixed(2).replace(/\.?0+$/, '')}` : 
                            t('outofStockMsg')} */}

                    </Typography>
                    <Typography
                        component="h3"
                        variant={matches ? "body2" : "body1"} 
                        color="text.primary"
                        gutterBottom
                    >
                        {product.description}
                    </Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
}