import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import LocalSettings  from '@mui/icons-material/MiscellaneousServicesOutlined';
import Settings from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';
import { useGlobalStore } from '../context/GlobalStore';
import { useUserState } from '../context/users/UserStore';

export default function Drawer() {
  const {menuItems,privateMenuItems,anchor,appNameDrawer} = useGlobalStore()
  const [state, setState] = React.useState(false);  // Drawer Status
  const [open, setOpen] = React.useState(true);     // Private Routes Sub-Menu
  const [{isAuthenticated},]= useUserState();
return (
    <React.Fragment>
    <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={()=>setState(true)} >
        <MenuIcon />
    </IconButton>
    <SwipeableDrawer
        anchor={anchor}
        open={state}
        onClose={()=>{(open) ? setState(true): setState(false)}}
        onOpen={()=>setState(true)}
        // variant = 'persistent'
        >
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{  display: { xs: 'none', sm: 'block' }, textAlign:'center', mt: { xs: 'none', sm:3} }} >
            {appNameDrawer}
        </Typography>
        <Divider sx={{pt:2}}/>
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={()=>{(open) ? setState(false): setState(true)}}
        onKeyDown={()=>setState(false)}
        >
        <List>
            {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton component={NavLink} to={item.path}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0.5 } },
                }}
            >
                <ListItemText
                    primary="Register Users"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary="Profile, Create Blogs, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open ? 'rgba(122,132,133,0)' : 'rgba(23,84,117,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <Tooltip title="Register User Options">
                    <IconButton>
                        <KeyboardArrowDown
                        sx={{
                            mr: -1,
                            opacity: 0,
                            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                        }}
                        />
                    </IconButton>
                </Tooltip>
            </ListItemButton>
            {open && isAuthenticated && privateMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton component={NavLink} to={item.path} >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
        <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }} component={NavLink} to={'/localSettings'} >
                <ListItemIcon>
                  <LocalSettings color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Local Settings"
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
              <Tooltip title="WebSite Settings">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(23,84,117,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider',
                    },
                  }}
                  component={NavLink} to={'/settings'} 
                >
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
          </List>
        </Box>
    </SwipeableDrawer>
    </React.Fragment>
);
} 