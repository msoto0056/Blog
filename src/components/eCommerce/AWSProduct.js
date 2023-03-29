import React from 'react';
import { useProductState} from '../../context/eCommerce/ProductStore';
//MaterialUI
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';

import Avatar from '@mui/material/Avatar';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function AWSProduct() {
  const [{product},] = useProductState();

	return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <MuiContainer disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
            <Paper elevation ={24} > 
                <Box
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  }}
                >
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="Games">
                            G
                        </Avatar>
                        }
                        title= {product.title}
                        subheader= {`$ ${product.price}`}
                    />
                    <CardMedia
                        sx={{ height: 140 }}
                        image={(product.image !== null)? product.image : "https://source.unsplash.com/random"}
                        title={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" startIcon={<AddShoppingCartOutlinedIcon />} color= "primary"> 
                         <Typography variant="body4" >
                              Add to Cart
                          </Typography>
                        </Button>
                        <Button size="small" href="/Products" variant={"outlined"} > 
                        <Typography variant="body3">
                            Return
                          </Typography>
                        </Button>
                    </CardActions>
                </Card>
                </Box> 
            </Paper>
		</MuiContainer>
    </React.Fragment>
	);
}