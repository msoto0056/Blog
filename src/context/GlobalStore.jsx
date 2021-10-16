import {makeStore} from "react-crud-plus-state-management";
import {actions} from './Types';

export const initialState = {
  // define elements to use in the app 
  confirmationDialog:{
      "confirmDel":false, 
      "isOpen":false,
      "title":'',
      "subTitle":'',
      "onConfirm": ()=>{console.log("deleting")},
    },
    notify:{
      "isOpen":false,
      "message":'',
      "type":'info'
    }
};
const GlobalReducer = (state, action) => {
    switch (action.type) {
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

const [
  GlobalProvider,
  useGlobalStore,
  useGlobalDispatch
] = makeStore(GlobalReducer, initialState)

export { GlobalProvider, useGlobalStore, useGlobalDispatch }