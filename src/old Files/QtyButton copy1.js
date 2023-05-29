import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import {useProductState} from '../../context/eCommerce/ProductStore';
import {actions} from '../../context/Types';


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
      <Box display="flex">
        <IconButton
          sx={{
            borderRadius: 0.5,
            background: '#ffa430',
          }}
          onClick={() => dispatch({type:actions.FIELDS, fieldName: 'count', payload: clampV(count - 1) })}
        >
            
          <RemoveIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            border: '1px solid gray',
            p: 1,
          }}
        >
          {count}
        </Typography>
        <IconButton
          sx={{
            borderRadius: 0.5,
            background: '#ffa430',
          }}
          onClick={() => dispatch({type:actions.FIELDS, fieldName: 'count', payload: clampV(count + 1) })}
        >
          <AddIcon />
        </IconButton>
      </Box>
    );
}