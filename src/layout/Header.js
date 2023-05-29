import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import { useLocation } from 'react-router-dom';
import { useBlogState} from '../context/blogs/BlogStore';
import { useProductState} from '../context/eCommerce/ProductStore';
import { useUserState, checkAuthenticated, load_user } from '../context/users/UserStore';
import { useGlobalStore, useGlobalDispatch } from '../context/GlobalStore';
import {actions} from '../context/Types';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink } from 'react-router-dom';
// import Drawer from './Drawer';
import SearchAppBar from './Search';
import Account from './Account';




const Header = () => {
	const [{blogCount},] = useBlogState();
	const [{productCountInCart},prodDispatch] = useProductState();
	console.log ("productCountInCart", productCountInCart)
    // const location = useLocation ()
	const [,dispatch]=useUserState()
	const globalDispatch=useGlobalDispatch();
	const {title} = useGlobalStore()
	React.useEffect ( ()=>{
		checkAuthenticated(dispatch)
		load_user(dispatch,globalDispatch)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="fixed"
				color='inherit'
				elevation={3}
                    sx={{borderBottom: 1, 
						borderColor: (theme) => theme.palette.divider,
						backgroundColor: (theme)=>theme.palette.grey[200] }}
			>
                <Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="secondary"
						aria-label="open drawer"
						sx={{ mr: 2  }}
						onClick={()=>{globalDispatch({type:actions.FIELDS, fieldName: 'drawerState', payload:true})}}
						>
						<MenuIcon />
					</IconButton>
                    <Typography variant="h6" color="inherit" noWrap sx={{
						flexGrow:1,  display: { xs: 'none', sm: 'block' }	}}>
						<Link component={NavLink} to='/' underline='none' color="textPrimary" > 
							{title} 
						</Link>
                    </Typography>
				
					<SearchAppBar />
					<Account />					
					<Badge badgeContent={blogCount} color="error" anchorOrigin={{vertical: 'top',horizontal: 'right'}}> 
            			<NotificationsIcon color = 'secondary' />
          			</Badge>
					{productCountInCart>0 && (<Badge badgeContent={productCountInCart} color="error" anchorOrigin={{vertical: 'top',horizontal: 'right'}}> 
            			<ShoppingCartOutlinedIcon color = 'primary' onClick={() => { prodDispatch({ type: actions.SHOW_HIDE_CART })}}/>
          			</Badge>)}
                </Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

Header.defaultProps = {
    title: 'No Title pass in App.js',
} 

Header.propTypes={
    title: PropTypes.string
}

export default Header;