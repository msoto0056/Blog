import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import { useBlogState} from '../context/blogs/BlogStore';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';


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
                    <Typography variant="h6" color="inherit" noWrap>
                       {title} 
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