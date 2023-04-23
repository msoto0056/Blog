  import {actions} from '../Types';
  
  const ProductReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_COUNT:
          return {
            ...state,
            count: state.taskCount+action.payload
          };
        case actions.FIELDS: {
          return {
            ...state,
            [action.fieldName]: action.payload,
          }
        }
        case actions.SHOW_HIDE_CART: {
          return {
            ...state,
            showCart: !state.showCart,
          };
        }
        case actions.ADD_TO_CART: {
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
            productCountInCart: state.productCountInCart+1,
          };
        }
        case actions.REMOVE_ITEM: {
          return {
            ...state,
            cartItems: state.cartItems.filter((item) => item._id !== action.payload),
            productCountInCart: state.productCountInCart - 1,
          };
        }
      default:
        return state;
    }
  };
  export default ProductReducer