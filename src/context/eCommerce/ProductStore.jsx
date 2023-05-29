import {makeStore2} from "../../custom-hooks";
import {initialState} from "./initialState";
import ProductReducer from "./ProductReducer";

const [
  ProductProvider,
  useProductState
  ] = makeStore2(ProductReducer, initialState)

export { ProductProvider, useProductState }


