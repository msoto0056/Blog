import React from 'react';
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
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import MuiContainer from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {Container} from  '../../layout/Container'
import {useRetrieve} from 'react-crud-plus-state-management';
import {useBlogState} from '../../context/blogs/BlogStore';
import {actions} from '../../context/Types';
import Loader from "react-loader-spinner";


const emptyMsg ='No hay blogs para mostrar'

function Posts() {
  const [{url},dispatch] = useBlogState();
  const onSuccessFetch=(data) =>{dispatch({type:actions.FIELDS, fieldName: 'blogCount', payload:data.length})}
  const {data:posts, error, isLoading, isError} = useRetrieve("blog",url,onSuccessFetch);
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
  return (
    <React.Fragment>
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
      </MuiContainer>
      <MuiContainer maxWidth="md" component="main">
        <Grid MuiContainer spacing={5} alignItems="flex-end">
          {posts.map((post) => {
		  return (
            // Enterprise card is full width at sm breakpoint
            	<Grid item key={post.id} xs={12} md={4} >
              		<Card>
                		<CardHeader
							title={post.title.substr(0, 50)}
							subheader={post.excerpt.substr(0, 60)}
							titleTypographyProps={{ align: 'center' }}
							action={post.title === 'Pro' ? <StarIcon /> : null}
							subheaderTypographyProps={{
								align: 'center',
							}}
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
							<Box
								sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'baseline',
								mb: 2,
								}}
							>
								<Typography component="h2" variant="h3" color="text.primary">
								{post.title.substr(0, 50)}...
								</Typography>
								<Typography variant="h6" color="text.secondary">
								/mo
								</Typography>
							</Box>
								<Typography
									component="li"
									variant="subtitle1"
									align="center"
								>
									{post.excerpt.substr(0, 60)}...
								</Typography>
								))
							</CardContent>
                  		<CardActions>
						<Button fullWidth variant='contained'>
							Complete blog
						</Button>
                		</CardActions>
              		</Card>
            	</Grid>
		 );
		})}
        </Grid>
      </MuiContainer>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <Posts />;
}