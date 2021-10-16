import { useBlogState} from '../../context/blogs/BlogStore';
import { useGlobalDispatch} from '../../context/GlobalStore';
import { useHistory } from "react-router-dom";
import BlogForm from './BlogForm';
import {useUpdate} from 'react-crud-plus-state-management';
import { actions } from '../../context/Types';


export const UpdateBlog = () => {
  const [{blog,url},] = useBlogState();
  const globalDispatch=useGlobalDispatch();
  const history = useHistory();
  const onSuccessUpd = ()=>{
    globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload:  {message:'Updated Successfully',isOpen:true, type:'success'}});
  }
  const {isLoading:loadingUpd, update, error,  isError} = useUpdate("blog",url,onSuccessUpd)

  const OnFormSubmit = (data) => {
    update(data)
    history.push("/");
  }

  return (
    <BlogForm onFormSubmit={OnFormSubmit} defaultValues={blog} isLoading={loadingUpd}/>
    // <TaskForm onFormSubmit={onFormSubmit}/>
  )
};
