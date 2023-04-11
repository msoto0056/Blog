import React, {useState} from 'react';
import { useProductState} from '../../context/eCommerce/ProductStore';
//MaterialUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import {ProductImageContainer} from '../../styles/product';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function Product() {
  const navigate = useNavigate();
  const [{product},] = useProductState();
  const [selectedPicture, setSelectedPicture] = useState(product.image);
  function handleClick() {
    navigate(-1); // go back to the previous page
  }
	return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <ImageList sx={{ width: {xs:60, md:80}, height: {xs:400, md:500 }, rowHeight: {xs:50,  md:70} }} cols={1} >   
                        {product.productImages.map((image,i) => (
                            <ImageListItem key={i} sx={{border:1, borderColor:'#e77600'}}>  
                                <img
                                src={`${image.pictures}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${image.picture}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={''}
                                loading="lazy"
                                onClick={()=>setSelectedPicture(image.pictures)}
                                />
                        </ImageListItem>
                        ))}
                    </ImageList>
                <Grid xl={1} md={2} sm={3} sx={4}>
                    <ProductImageContainer> 
                        <img src={`${selectedPicture}?auto=format`} /> 
                    </ProductImageContainer>
                </Grid>
               <Grid md={2} xs={4}
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
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="Games">
                            G
                        </Avatar>
                        }
                        title= {product.title}
                        subheader= {`$ ${product.price}`}
                    />
                    <CardMedia
                        sx={{ height: 140 }}
                        image={(product.image !== null)? product.image : "https://source.unsplash.com/random"}
                        title={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" startIcon={<AddShoppingCartOutlinedIcon />} color= "primary"> 
                         <Typography variant="body4" >
                              Add to Cart
                          </Typography>
                        </Button>
                        <Button size="small" onClick={handleClick} variant={"outlined"} > 
                        <Typography variant="body3">
                            Return
                          </Typography>
                        </Button>
                    </CardActions>
                </Card>
                </Grid> 
            </Grid>
        </Box>
    );
}