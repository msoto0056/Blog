import "./Cart.css";
import { useProductState} from "../../context/eCommerce/ProductStore";
// import formatCurrency from "format-currency";
import CartItem from "./CartItem";
import {actions} from '../../context/Types';

const Cart = () => {
  const [{ showCart, cartItems }, dispatch] = useProductState();
  const amount = 10028.34
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
        <div className='cart__wrapper'>
          <div style={{ textAlign: "right" }}>
            <i
              style={{ cursor: "pointer" }}
              className='fa fa-times-circle'
              aria-hidden='true'
              onClick={() => { dispatch({ type: actions.SHOW_HIDE_CART })}}
            ></i>
          </div>
          <div className='cart__innerWrapper'>
            {cartItems.length === 0 ? (
              <h4>Cart is Empty</h4>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </ul>
            )}
          </div>
          <div className='Cart__cartTotal'>
            <div>Cart Total</div>
            <div></div>
            <div style={{ marginLeft: 5 }}>
              {/* {cartItems.reduce((amount, item) => item.price + amount, 0)} */}
              {(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
