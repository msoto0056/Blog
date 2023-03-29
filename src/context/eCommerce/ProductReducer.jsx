  import {actions} from '../Types';
  
  const ProductReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_COUNT:
          return {
            ...state,
            taskCount: state.taskCount+action.payload
          };
        case actions.FIELDS: {
          return {
            ...state,
            [action.fieldName]: action.payload,
          }
        }
      default:
        return state;
    }
  };
  export default ProductReducer