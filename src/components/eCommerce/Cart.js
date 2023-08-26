import React from "react";
import { useProductState} from "../../context/eCommerce/ProductStore";
import CartItem from "./CartItem";
import {actions} from '../../context/Types';
import {CartWrapper, CloseCartIcon} from '../../styles/product'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import IconButton from '@mui/material/IconButton';

const Cart = () => {
  const [{ showCart, cartItems }, dispatch] = useProductState();
    const { t, i18n } = useTranslation()
  const amount = cartItems.reduce((total, item) => {
    if (item.product && typeof item.product.price === 'string') {
      const price = parseFloat(item.product.price);
      if (!isNaN(price)) {
        return total + (price*item.count);
      }
    } else if (item.product && typeof item.product.price === 'number') {
      return total + (item.product.price*item.count);
    }
    return total;
  }, 0);
  // let opts = { format: "%s%v", symbol: "€" };

  // const number = 123456.789;
  // console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
  // Expected output: "123.456,79 €"

  // The Japanese yen doesn't use a minor unit
  // The Japanese yen doesn't use a minor unit
  // console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
  // Expected output: "￥123,457"
  // Costa Rica
  // console.log(new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(number));
  // Expected output: "￥123,457"

  return (
    <>
      {showCart && (
        <CartWrapper>
            <CloseCartIcon onClick={() => { dispatch({ type: actions.SHOW_HIDE_CART })}} >
              <HighlightOffTwoToneIcon/>
            </CloseCartIcon>
            <List sx={{ height: 'max-content', maxHeight: '50vh', bgcolor: 'background.paper',   overflowY: 'auto', listStyle:'none' }}>
            {cartItems.length === 0 ? (
              <h4>{t("cartEmptyMsg")}</h4>
            ) : (
              <>
                {cartItems.map((item,i) => (
                   <CartItem item={item} key={i} />
                ))}
              </>
            )}

            <Divider  component="li" /> 
            <ListItem alignItems="center"
              secondaryAction={
              <Tooltip title={t("checkoutMsg")} color='secondary'>
                <IconButton edge="end" aria-label="delete" onClick={() => console.log("Check-out")} sx={{ ml: 'auto' }}>
                  <ShoppingCartCheckoutOutlinedIcon color='shoppingCart'/>
                </IconButton>
              </Tooltip>            
                      }
            >
              <ListItemText
                primary={`${t("cartTotalMsg")} ${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount))}`}
              />
            </ListItem>
          </List>
        </CartWrapper>
      )}
    </>
  );
};

export default Cart;

