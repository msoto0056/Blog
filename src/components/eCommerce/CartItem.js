import React from "react";
import { useProductState} from "../../context/eCommerce/ProductStore";
import {actions} from '../../context/Types';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";


const CartItem = ({ item }) => {
  console.log("cart item",item)
  const [,dispatch] = useProductState();
  const { t, i18n } = useTranslation()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const removeItem = (id) => {
    dispatch({ type: actions.REMOVE_ITEM, payload: id });
  };
  return (
    <>
      <ListItem alignItems="flex-start" 
          secondaryAction={
            <Tooltip title={t("deleteMsg")} color='secondary'>
              <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.product.id)} sx={{ ml: 'auto' }}>
                  <DeleteIcon color='primary'/>
              </IconButton>
            </Tooltip>            
          }
        >
        <ListItemAvatar>
          <Badge badgeContent={item.count} color="badgeProd" 
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
          <Avatar alt='' src={item.product.image}
          sx={{width: matches?40:50, height: matches?40:50 }}/>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={item.product.title}       
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                {(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.product.price))}
              </Typography>
              <Typography
                sx={{ display: 'block', ml:3 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.product.price*item.count))}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    <Divider  component="li" /> 
    </>
  );
};

export default CartItem;
