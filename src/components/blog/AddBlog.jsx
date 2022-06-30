import { useBlogState } from '../../context/blogs/BlogStore';
import { useGlobalDispatch } from '../../context/GlobalStore';
import { useNavigate } from "react-router-dom"
import BlogForm from './BlogForm';
import {useCreate} from '../../custom-hooks';
import { initialState } from '../../context/blogs/initialState';
import { actions } from '../../context/Types';


export const AddBlog = () => {
  const [{url},dispatch] = useBlogState();
  const globalDispatch = useGlobalDispatch();
  let navigate = useNavigate();

  const onSuccessAdd = ()=>{
    globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload:  {message:'Added Successfully',isOpen:true, type:'success'}});
    dispatch({type:actions.SET_COUNT, payload:1});
  }
  const {isLoading:loadingAdd, create, error,  isError} = useCreate("blog",url,onSuccessAdd)

  const OnFormSubmit = (data) => {
    create(data)
    navigate("/");
  }

  
  return (
    <BlogForm onFormSubmit={OnFormSubmit} defaultValues={initialState.blog} isLoading={loadingAdd}/>
  )
};


