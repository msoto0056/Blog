import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
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
import Alert from '@mui/material/Alert';
import {Container} from  '../../layout/Container'
import {useRetrieve} from '../../custom-hooks';
import {useProductState} from '../../context/eCommerce/ProductStore';
import {actions} from '../../context/Types';
import Loader from "react-loader-spinner";
// import AppPagination from './AppPagination';
import Pagination from '@mui/material/Pagination';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Promotions from './Promotions';



const emptyMsg ='No hay products para mostrar'
const pageSize = 3;

export default function Products() {
  let navigate = useNavigate();
  const [{url,productCount},dispatch] = useProductState();
  const onSuccessFetch=(data) =>{dispatch({type:actions.FIELDS, fieldName: 'productCount', payload:data.length})}
  const {data:products, error, isLoading, isError} = useRetrieve("product",url,onSuccessFetch);
  const [checked, setChecked] = useState(true);  


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handlePageChange = (event, page) => {
    const from = (page- 1) * pageSize;
    const to = (page -1 ) * pageSize + pageSize
    setPagination({...pagination, from: from, to: to })
  };

  const [pagination, setPagination] = useState({
    count:productCount,
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
  if (!products || products.length === 0) {
    return (
        <Container>
          <Alert severity="error">{emptyMsg}</Alert>
        </Container>
    );
  } 
  
  const newProducts = (checked) ? products.slice(pagination.from, pagination.to) : products

  const handleView = (product) => {
    dispatch({type:actions.FIELDS, fieldName: 'product', payload: product})
    navigate(`/viewProduct/${product.slug}`);
  }

  return (
    <React.Fragment>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Games
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
          <IconButton aria-label="settings" sx={{display:"flex", justifyContent:"right"}}>
            <MoreVertIcon />
        </IconButton>
        </Box>
        <Grid className='Tarjetas' container spacing={5} alignItems="center" justifyContent='center'>
          {newProducts.map((product) => {
		        return (
              // Enterprise card is full width at sm breakpoint
            	  <Grid item key={product.id} xs={12} sm={6} md={4} xl={2}>
                  <Card className='card'>
                		<CardHeader
                      title={product.title.substr(0, 50)}
                      titleTypographyProps={{ align: 'center' }}
                      action={product.title === 'Pro' ? <StarIcon /> : null}
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
                      // image="https://source.unsplash.com/random"
                      image = {(product.image !== null)? product.image : "https://source.unsplash.com/random"}
             
                      title="Image title"
                    />
                    <CardContent>
                      <Typography
                        variant="caption"
                        align="center"
                      >
                        {product.description.substr(0, 60)}...
                      </Typography>
          			    </CardContent>
                    <CardActions>
                      <Button size="small"  variant={"outlined"} onClick={()=>{handleView(product)}}>
                        <Typography variant="body4">
                          View Product
                        </Typography>
                      </Button>
                      <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                      </IconButton>
                    </CardActions>
                    <Stack spacing={1}>
                        <Rating name="half-rating"  size="small"  defaultValue={2.5} value={Number(product.rating)} precision={0.25} sx={{mt:1, mb:2}}/>
                    </Stack>
                  </Card>
                </Grid>
            );
		      })}
        </Grid>
          <Box sx={{display:"flex", mt:2, justifyContent:"center" }}>
            {checked && <Pagination count={Math.ceil(productCount / pageSize)} variant="outlined" color="primary" onChange={handlePageChange}/>}
          </Box>
          <Promotions />
    </React.Fragment>
  );
}

