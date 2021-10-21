import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import { useBlogState} from '../context/blogs/BlogStore';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink } from 'react-router-dom';


const Header = ({title } ) => {
	const [{blogCount},] = useBlogState();
    const location = useLocation ()
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color='inherit'
				elevation={0}
                    sx={{borderBottom: 1, 
						borderColor: (theme) => theme.palette.divider }}
			>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap sx={{
						flexGrow:1
					}}>
						<Link component={NavLink} to='/' underline='none' color="textPrimary" > 
							{title} 
						</Link>
                    </Typography>
				    <Badge badgeContent={blogCount} color="error" anchorOrigin={{vertical: 'top',horizontal: 'right'}}> 
            			<NotificationsIcon />
          			</Badge>
					{location.pathname === '/' &&  
         				<Button href='/addPeople' variant={"contained"} color="info" size="small"  
              				endIcon={<AddCircleOutlineOutlinedIcon/>}
							  sx={{marginLeft:5}}>
              				Add        
         			 	</Button> 
         			}
					 <nav>
						<Link
							color="textPrimary"
							href="#"
							sx={{margin: (theme) =>  theme.spacing(1, 1.5)}}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						sx={{margin: (theme) =>  theme.spacing(1, 1.5)}}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						sx={{margin: (theme) =>  theme.spacing(1, 1.5)}}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button>
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