import "./CartItem.css";
import { useProductState} from "../../context/eCommerce/ProductStore";
import {actions} from '../../context/Types';
// import formatCurrency from "format-currency";

const CartItem = ({ item }) => {
  const [, dispatch] = useProductState();
  const removeItem = (id) => {
    dispatch({ type: actions.REMOVE_ITEM, payload: id });
  };
  // let opts = { format: "%s%v", symbol: "€" };
  return (
    <li className='CartItem__item'>
      <img src={item.image} alt='' />
      <div>
        {item.title} {(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price))};
      </div>
      <button className='CartItem__button' 
        onClick={removeItem(item.id)} 
      > 
        Remove
      </button>
    </li>
  );
};

export default CartItem;
