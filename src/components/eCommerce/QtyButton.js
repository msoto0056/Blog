import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useProductState} from '../../context/eCommerce/ProductStore';
import {actions} from '../../context/Types';
import {ShoppingBadge, IncDecWrapper} from '../../styles/product'


export default function IncDec() {
    const clamp = (min, max) => (v) => v <= min ? min : v >= max ? max : v;
    const [{product,count},dispatch] = useProductState();
    const qty = (strNum) => {
        const num = Number(strNum)
        return isNaN(num) ? 0 : num;
      };
    const productQty = qty(product.qty);
    const clampV = clamp(1, productQty);

    return (
    <IncDecWrapper> 
        <Stack direction="row" alignItems="center" spacing={0}>
          <IconButton color="secondary" aria-label="decreae" component="label"  size="small"
            onClick={() => dispatch({type:actions.FIELDS, fieldName: 'count', payload: clampV(count - 1) })}
        >
           <RemoveIcon fontSize="small"/>
        </IconButton>
        <IconButton aria-label="cart">
        <ShoppingBadge badgeContent={count} color="primary">
            <ShoppingCartIcon fontSize='large'/>
        </ShoppingBadge>
        </IconButton>
            <IconButton color="secondary" aria-label="increase" component="label" size="small"
            onClick={() => dispatch({type:actions.FIELDS, fieldName: 'count', payload: clampV(count + 1) })}
        >
          <AddIcon fontSize="small"  />
        </IconButton>
        </Stack>
        </IncDecWrapper>
    );
}