import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiContainer from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {Container} from  '../../layout/Container'
import {useRetrieve} from '../../custom-hooks';
import {useBlogState} from '../../context/blogs/BlogStore';
import { useGlobalStore } from '../../context/GlobalStore';
import {actions} from '../../context/Types';
import Loader from "react-loader-spinner";
// import AppPagination from './AppPagination';
import Pagination from '@mui/material/Pagination';




export default function Posts() {
  const { t } = useTranslation()
  const emptyMsg = t('emptyBlogMsg');
  let navigate = useNavigate();
  const [{url,blogCount},dispatch] = useBlogState();
  const onSuccessFetch=(data) =>{dispatch({type:actions.FIELDS, fieldName: 'blogCount', payload:data.length})}
  const {data:posts, error, isLoading, isError} = useRetrieve("blog",url,onSuccessFetch);
  const [checked, setChecked] = useState(true);  
  const {pageSize}=useGlobalStore()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handlePageChange = (event, page) => {
    const from = (page- 1) * pageSize;
    const to = (page -1 ) * pageSize + pageSize
    setPagination({...pagination, from: from, to: to })
  };

  const [pagination, setPagination] = useState({
    count:blogCount,
    from:0,
    to: pageSize 
  });


  if (isLoading) {
	  return (
      <p style={{ fontSize: '25px' }}>
			{t('isLoadingMsg')}
			<Loader type="ThreeDots" color="#4682b4" height={5} />
		</p>
	)
  };
  if (isError) {
    let errorMsg=error
    return (
      <Container>
        <Alert severity="error">{errorMsg.message}</Alert>
      </Container>
    );
  }
  if (!posts || posts.length === 0) {
    return (
        <Container>
          <Alert severity="error">{emptyMsg}</Alert>
        </Container>
    );
  } 
  
  const newPosts = (checked) ? posts.slice(pagination.from, pagination.to) : posts


  const handleView = (blog) => {
    dispatch({type:actions.FIELDS, fieldName: 'blog', payload: blog})
    navigate(`/viewBlog/${blog.slug}`);
  }


  return (
    <React.Fragment> 
      <CssBaseline />
      <Box sx={{display:"flex", justifyContent: 'flex-start',   position: 'relative', mt:5}}>
        <Box sx={{flex: '0 1 auto', position:'absolute', ml: {sm:'50%', xs:'25%'}}}>
        <Typography
          component="h1"
          variant={matches ? "h4" : "h3"} 
          color="text.primary"
          gutterBottom
        >
          Blogs
        </Typography>
        </Box>
        {/* <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'block' }}}> */}
        <Box sx={{ ml: 'auto' }}>
          <FormGroup>
          <FormControlLabel control= {<Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} size="small" />} 
            label={
              <Typography variant="body3">
                  Pagination 
              </Typography>
            }
          />
          </FormGroup>
          <IconButton aria-label="settings" sx={{display: 'flex', justifyContent:"flex-end"}}>
            <MoreVertIcon />
        </IconButton>
        </Box>
      </Box>
      <Grid container spacing={5} alignItems="center" justifyContent='center'>
        {newPosts.map((post) => {
		      return (
            // Enterprise card is full width at sm breakpoint
              <Grid item key={post.id} xs={12} sm={6} md={4} xl={2}>
                <Card>
                  <CardHeader
                    title={post.title.substr(0, 50)}
                    // subheader={post.excerpt.substr(0, 60)}
                    titleTypographyProps={{ align: 'center' }}
                    action={post.title === 'Pro' ? <StarIcon /> : null}
                      subheaderTypographyProps={{ align: 'center', }}
                      sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                      }}
                  /> 
                  <CardMedia
                    sx={{paddingTop: '56.25%'}} 
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      align="center"
                    >
                      {post.excerpt.substr(0, 60)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant='contained'onClick={()=>{handleView(post)}}>
                      Read blog
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
          );
        })}
        </Grid>
          <Box sx={{display:"flex", mt:2, justifyContent:"center" }}>
            {checked && <Pagination count={Math.ceil(blogCount / pageSize)} variant="outlined" color="primary" onChange={handlePageChange}/>}
              {/* <Pagination 
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handlePageChange}/>  */}
            </Box>
    </React.Fragment> 
  );
}

// export default function Pricing() {
//   return <Posts />;
// }