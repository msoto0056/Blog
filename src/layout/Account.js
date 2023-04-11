import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import { useUserState } from '../context/users/UserStore';
import { NavLink } from 'react-router-dom';


export default function Accounts() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [{isAuthenticated},]= useUserState();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <React.Fragment> 
       {auth && ( 
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color='fourth'
              >
              <AccountCircle  />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <Divider />
              {!isAuthenticated && <MenuItem component={NavLink} to={'/login'}>Login </MenuItem>}
              {isAuthenticated && <MenuItem component={NavLink} to={'/logout'}>Logout </MenuItem>}
              <MenuItem component={NavLink} to={'/register'}>Register </MenuItem>
              </Menu>
        </>
        )}
    </React.Fragment> 
  );
}
