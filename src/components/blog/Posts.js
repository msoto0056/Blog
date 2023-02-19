import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
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
import GlobalStyles from '@mui/material/GlobalStyles';
import MuiContainer from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import {Container} from  '../../layout/Container'
import {useRetrieve} from '../../custom-hooks';
import {useBlogState} from '../../context/blogs/BlogStore';
import {actions} from '../../context/Types';
import Loader from "react-loader-spinner";
// import AppPagination from './AppPagination';
import Pagination from '@mui/material/Pagination';
import {theme} from  '../../layout/myTheme';



const emptyMsg ='No hay blogs para mostrar'
const pageSize = 3;
const pase="Aqui estoy posts"
console.log(pase)

function Posts() {
  // let newPosts = {}
  let navigate = useNavigate();
  const [{url,blogCount},dispatch] = useBlogState();
  const onSuccessFetch=(data) =>{dispatch({type:actions.FIELDS, fieldName: 'blogCount', payload:data.length})}
  const {data:posts, error, isLoading, isError} = useRetrieve("blog",url,onSuccessFetch);
  const [checked, setChecked] = useState(true);  


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handlePageChange = (event, page) => {
    const from = (page- 1) * pageSize;
    const to = (page -1 ) * pageSize + pageSize
    console.log("Page Chaged Trigger");
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
			We are waiting for the data to load!
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

  console.log("posts", posts)
  console.log("newPosts", newPosts)

  const handleView = (blog) => {
    dispatch({type:actions.FIELDS, fieldName: 'blog', payload: blog})
    navigate(`/viewBlog/${blog.slug}`);
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <MuiContainer disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Posts
        </Typography>
        <Box sx={{display:"flex", justifyContent:"right"}}>
          <FormGroup>
          <FormControlLabel control= {<Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} size="small" />} 
            label={
              <Typography variant="body3">
                  Pagination 
              </Typography>
            }
          />
          </FormGroup>
        </Box>
      </MuiContainer>

      <MuiContainer maxWidth="sm" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {newPosts.map((post) => {
		        return (
              // Enterprise card is full width at sm breakpoint
            	  <Grid item key={post.id} xs={12} sm={6} md={4} >
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
      </MuiContainer>
    </ThemeProvider>
  );
}

export default function Pricing() {
  return <Posts />;
}