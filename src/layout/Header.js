import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useBlogState} from '../context/blogs/BlogStore';
import { useUserState, checkAuthenticated, load_user } from '../context/users/UserStore';
import { useGlobalStore, useGlobalDispatch } from '../context/GlobalStore';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink } from 'react-router-dom';
import Drawer from './Drawer';
import SearchAppBar from './Search';
import Account from './Account';


const Header = ({setState}) => {
	const [{blogCount},] = useBlogState();
    const location = useLocation ()
	const [,dispatch]=useUserState()
	const globalDispatch=useGlobalDispatch();
	const {title} = useGlobalStore()
	React.useEffect ( ()=>{
		checkAuthenticated(dispatch)
		load_user(dispatch,globalDispatch)
	},[])
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
					{/* <Drawer /> */}
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2  }}
						onClick={()=>setState(true)} 
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
            			<NotificationsIcon />
          			</Badge>
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