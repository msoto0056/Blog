import {makeStore2} from "../../custom-hooks";
import {initialState} from "./initialState";
import BlogReducer from "./BlogReducer";

const [
  BlogProvider,
  useBlogState
  ] = makeStore2(BlogReducer, initialState)

export { BlogProvider, useBlogState }