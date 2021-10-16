import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { green, pink } from '@mui/material/colors';
import { useBlogState} from '../../context/blogs/BlogStore';
import { useGlobalStore, useGlobalDispatch} from '../../context/GlobalStore';
import {actions} from '../../context/Types';
import { useHistory } from "react-router-dom";
import Notification from '../../layout/FormControlMaterialUI/Notification';
import ConfirmationDialog from '../../layout/FormControlMaterialUI/ConfirmationDialog';
import {useRetrieve, useDelete, useUpdate} from 'react-crud-plus-state-management';
import {Container} from  '../../layout/Container'
import Loader from "react-loader-spinner";


const size="medium";
const title="Delete";
const title1="Double click to toggle active - inactive";
const title2="Update";

export default function ListBlog() {
    const history = useHistory();
    const {confirmationDialog} = useGlobalStore();
    const [{url},dispatch] = useBlogState();
    const globalDispatch = useGlobalDispatch();
        
    const {isLoading:loadingUpd, update, error:errorUpd,  isError:isErrorUpd} = useUpdate("blog",url)

    const updateStatus = async ( blog)=> {
      const newBlog={...blog, active:!blog.active}
      update(newBlog)
    }
    const handleUpdate = (blog) => {
      // const newBlog={...blog,birthday:new Date(person.birthday)}
      dispatch({type:actions.FIELDS, fieldName: 'blog', payload: blog})
      history.push(`/updateTask/:${blog.id}`);
    }
    const handleDelete = (id)=>{
      if (confirmationDialog.confirmDel) {
        globalDispatch({type:actions.FIELDS, fieldName: 'confirmationDialog',
          payload: {...confirmationDialog,isOpen:true,title:'Are you sure you want to',subTitle:'Delete?',
          onConfirm: () => remove(id)}})
      }else {
        remove(id)
      }
    }

    // Function definition for react query options: onSuccess 
    const onSuccessDel = confirmationDialog.confirmDel ? 
      ()=>
        {
        globalDispatch({type:actions.FIELDS, fieldName: 'confirmationDialog',payload: {...confirmationDialog,isOpen:false}});
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: {message:'Deleted Successfully',isOpen:true, type:'error'}});
        dispatch({type:actions.SET_COUNT, payload:-1});
        }
      :
      ()=>
        {
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: {message:'Deleted Successfully',isOpen:true, type:'error'}});
        dispatch({type:actions.SET_COUNT, payload:-1});
        }
    const onSuccessFetch=(data) =>{dispatch({type:actions.FIELDS, fieldName: 'blogCount', payload:data.length})}

    const {data:blogs, error, isLoading, isError} = useRetrieve("blog",url,onSuccessFetch);
   
    const {isLoading:loadingDel, remove, error:errorDel,  isError:isErrorDel} = useDelete("blog",url,onSuccessDel)

    if (isLoading) {
        return (
          <Container>
            <Loader type="ThreeDots" color="#4682b4" height={5} />
          </Container>
        );
    }
    if (isError || isErrorDel || isErrorUpd) {
      let errorMsg=undefined
      switch (isError || isErrorDel || isErrorUpd) {
        case isError:
          errorMsg=error
          break;
        case isErrorDel:
          errorMsg=errorDel
          break;  
        case isErrorUpd:
          errorMsg=errorUpd
          break;
        default:
          break;
      }    
      return (
        <Container>
          <Alert severity="error">{errorMsg.message}</Alert>
        </Container>
      );
    }
    if (blogs.length === 0 ) {
      return (
          <Container>
            <Alert severity="error">No hay blogs para mostrar</Alert>
          </Container>
      );
    } 
  return (
    <>
      <List dense subheader={<ListSubheader sx={{typography: 'subtitle', fontWeight:'500'}} >Blogs</ListSubheader>}
            sx={{ bgcolor: 'background.paper',  overflow: 'auto', maxHeight: 465,
            position: 'relative', justifyContent:'space-between' }}>
        {blogs.map((blog) => {      
            return (
              <ListItem
                key={blog.id}
                secondaryAction={
                <>
                    <Tooltip title={title2}> 
                    <IconButton aria-label="modify" sx={{ color: green[400] }} size={size} 
                      onClick={()=>{handleUpdate(blog)}}> 
                      <EditOutlinedIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={title}> 
                    <IconButton aria-label="delete" sx={{ color: pink[600] }} size={size} 
                      onClick={()=>handleDelete(blog.id)}>
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                </>
            }
                disablePadding
              >
                <ListItemButton sx={{ borderLeft:4}} style={(blog.active)? {borderColor:green[500]}: {borderColor:pink[400]} } >
                   <ListItemAvatar>
                       {(blog.active)?
                        <Avatar alt="people photo" src='https://source.unsplash.com/random' sx={{ bgcolor: green[500] }}/>   :
                        <Avatar alt="people photo" src='https://source.unsplash.com/random' sx={{ bgcolor: pink[500] }} />
                        // <Avatar sx={{ bgcolor: green[500] }}>A</Avatar>  :
                        // <Avatar sx={{ bgcolor: pink[500] }}>I</Avatar> 
                       }

                    </ListItemAvatar> 
                              
                  <Tooltip title={title1}> 
                    <ListItemText 
                      primary={ 
                        <Typography variant='h6' noWrap sx={{maxWidth:280}}>{blog.title}</Typography>}
                      secondary={
                        <Typography variant='body2' noWrap sx={{maxWidth:180}}>{blog.excerpt}</Typography>}
                      onDoubleClick={()=>updateStatus(blog)} />
                    </Tooltip>
                </ListItemButton>
              </ListItem>
            );
        })}
        <Notification />
        <ConfirmationDialog/>
      </List>
    </>
  );
}
