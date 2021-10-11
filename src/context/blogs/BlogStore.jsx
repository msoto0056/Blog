import {makeStore2} from "react-crud-plus-state-management";
import {initialState} from "./initialState";
import BlogReducer from "./BlogReducer";

const [
  BlogProvider,
  useBlogState
  ] = makeStore2(BlogReducer, initialState)

export { BlogProvider, useBlogState }