import { useBlogState } from '../../context/blogs/BlogStore';
import { useGlobalDispatch } from '../../context/GlobalStore';
import { useNavigate } from "react-router-dom"
import BlogForm from './BlogForm';
import {useCreate} from '../../custom-hooks';
import { initialState } from '../../context/blogs/initialState';
import { actions } from '../../context/Types';
import axiosInstance from '../users/axios';


export const AddBlog = () => {
  const [{url},dispatch] = useBlogState();
  const globalDispatch = useGlobalDispatch();
  let navigate = useNavigate();

  const onSuccessAdd = ()=>{
    globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload:  {message:'Added Successfully',isOpen:true, type:'success'}});
    dispatch({type:actions.SET_COUNT, payload:1});
  }
  const onErrorAdd = () =>{
    globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
    {message: `${error.message} - ${error.response.data.detail}` ,isOpen:true, type:'error'}})
  }

  const {isLoading:loadingAdd, create, error,  isError} = useCreate("blog",url,onSuccessAdd, onErrorAdd)

  const OnFormSubmit = (data) => {
    axiosInstance.defaults.headers.post['Content-Type']  = 'multipart/form-data'
    // create(data)
    console.log('data',data)
    axiosInstance.post(`/blog/`, data);
    axiosInstance.defaults.headers.post['Content-Type']  = 'application/json'
    navigate("/");
  }

  
  return (
    <BlogForm onFormSubmit={OnFormSubmit} defaultValues={initialState.blog} isLoading={loadingAdd}/>
  )
};


