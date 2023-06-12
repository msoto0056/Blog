import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Box from '@mui/material/Box';
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
import {ProductViewButton} from '../../styles/product'
import Alert from '@mui/material/Alert';
import {Container} from  '../../layout/Container'
import {useRetrieve} from '../../custom-hooks';
import {useProductState} from '../../context/eCommerce/ProductStore';
import { useGlobalStore } from '../../context/GlobalStore';
import {actions} from '../../context/Types';
import { useTranslation } from 'react-i18next'
import Loader from "react-loader-spinner";
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Promotions from './Promotions';id
import Categories from './Categories';


export default function Products() {
  let navigate = useNavigate();
  const { t } = useTranslation()
	const emptyMsg = t('emptyProdMsg');
  const [{url,productCount,promotionMessages, category, categoryId},dispatch] = useProductState();
  const updatedUrl = categoryId === 0 ? `${url}categories/all/` : `${url}categories/${categoryId}`;

  console.log('url & updatedUrl',url+" "+ updatedUrl)
  console.log('categoryId',categoryId)

  
  const onSuccessFetch=(data) =>{dispatch({type:actions.FIELDS, fieldName: 'productCount', payload:data.length})}
  const {data:products, error, isLoading, isError} = useRetrieve("products",url,onSuccessFetch);
  const {data:categoryProducts, error1, isLoading1, isError1} = useRetrieve("categoryProducts",updatedUrl);

  const arrayProducts= categoryId === 0 ? products: categoryProducts.products

  const [checked, setChecked] = useState(true);  
  const {displayPromotionMsg,pageSize}=useGlobalStore()
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
    count:productCount,
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
  if (!products || products.length === 0) {
    return (
        <Container>
          <Alert severity="error">{emptyMsg}</Alert>
        </Container>
    );
  } 
  
  const newProducts = (checked) ? products.slice(pagination.from, pagination.to) : products

  const handleView = (product) => {
    dispatch({type:actions.FIELDS, fieldName: 'product', payload: product});
    dispatch({type:actions.FIELDS, fieldName: 'count', payload: 1});
    navigate(`/viewProduct/${product.slug}`);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{display:"flex", justifyContent: 'flex-start',   position: 'relative', mt:5}}>
        <Box sx={{flex: '0 1 auto', position:'absolute', ml: {sm:'50%', xs:'25%'}}}>
        <Typography
          component="h1"
          variant={matches ? "h4" : "h2"} 
          color="text.primary"
          gutterBottom
          fontFamily={"Cinzel"}
          fontWeight={"bold"}
        >
          {category}
        </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <FormGroup>
          <FormControlLabel control= {<Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} size="small" />} 
            label={
              <Typography variant="body3">
                  {t('pagMsg')}
              </Typography>
            }
          />
          </FormGroup>
          <IconButton aria-label="settings" sx={{display: 'flex', justifyContent:"flex-end"}}>
            <MoreVertIcon />
        </IconButton>
        </Box>
      </Box>
        <Grid className='Tarjetas' container spacing={5} alignItems="center" justifyContent='center'>
          <Box display='flex' sx={{mr:10, p:0}}>
            <Categories />
          </Box>
          {newProducts.map((product) => {
		        return (
              // Enterprise card is full width at sm breakpoint
            	  <Grid item key={product.id} xs={12} sm={6} md={4} xl={2} sx={{margin:2}}>
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
                      <ProductViewButton size="small"  variant={"outlined"} onClick={()=>{handleView(product)}}>
                        <Typography variant="body5" color="text.primary">
                          {t('viewProdMsg')}
                        </Typography>
                      </ProductViewButton>
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
          {promotionMessages!==null&&displayPromotionMsg&&<Promotions />}
          {/* <Cart /> */}
    </React.Fragment>
  );
}

