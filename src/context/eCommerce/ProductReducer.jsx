  import {actions} from '../Types';
  
  const ProductReducer = (state, action) => {
    switch (action.type) {
        case actions.INCREMENT:
          return {...state,
            count: state.count + 1 
          }
        case actions.DECREMENT:
          return {...state,
            count: state.count - 1 
          }
        case actions.SET_COUNT:
          return {
            ...state,
            count: state.count+action.payload
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
        case actions.ADD_TO_CART:{
          const { product } = action.payload;
          const existingItem = state.cartItems.find(item => item.product.id === product.id);
          if (existingItem) {
            const updatedCartItems = state.cartItems.map(item => {
              if (item.product.id === product.id) {
                return {
                  ...item,
                  count: item.count + state.count
                };
              }
              return item;
            });
    
            return {
              ...state,
              cartItems: updatedCartItems
            };
          } else {
            return {
              ...state,
              cartItems: [...state.cartItems, { product, count: state.count }],
              productCountInCart: state.productCountInCart + 1
            };
          }
        }
        case actions.UPDATE_QUANTITY:{
          const {product} = state;
          return{
            ...state,
            product: {
              ...product,
              qty: product.qty - state.count,
            },
            count:1
          }
        }
        case actions.UPDATE_CART:{
          const {product} = state;
          return {
            ...state,
            product: {
              ...product,
              qty: action.payload,
            },
          };
        }
        case actions.REMOVE_ITEM: {
          return {
            ...state,
            cartItems: state.cartItems.filter((item) => item.product.id !== action.payload),
            productCountInCart: state.productCountInCart - 1
          };
        }
      default:
        return state;
    }
  };
  export default ProductReducer