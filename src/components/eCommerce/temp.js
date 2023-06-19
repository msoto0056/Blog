import React, { useState, useEffect } from 'react';
import { useProductState } from '../../context/eCommerce/ProductStore';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import { ProductImageContainer, ProductImage1 } from '../../styles/product';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { actions } from '../../context/Types';
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
  const [{ product, cartItems, selectedCategory }, dispatch] = useProductState();

  useEffect(() => {
    // Update product qty if product is in the cart already - before writing the cart to the DB
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      const newQty = product.qty - existingItem.count;
      dispatch({ type: actions.UPDATE_CART, payload: newQty });
    }
  }, []);

  const [selectedPicture, setSelectedPicture] = useState(product.image);

  function handleClick() {
    navigate(-1); // go back to the previous page
  }

  const categoryLetter = selectedCategory ? selectedCategory.charAt(0).toUpperCase() : 'A';

  return (
    <Box sx={{ flexGrow: 1, margin: 1 }}>
      <Grid2 container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* Rest of the code */}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="Category">
              {categoryLetter}
            </Avatar>
          }
          title={product.title}
          subheader={`$ ${product.price}`}
        />

        {/* Rest of the code */}
      </Grid2>
    </Box>
  );
}
