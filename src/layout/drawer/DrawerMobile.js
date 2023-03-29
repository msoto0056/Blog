import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';   //try this for mobiles
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalSettings  from '@mui/icons-material/MiscellaneousServicesOutlined';
import Settings from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';
import { useGlobalStore,useGlobalDispatch } from '../../context/GlobalStore';
import { useUserState } from '../../context/users/UserStore';
import {actions} from '../../context/Types';
import theme from "../../styles/theme";


export default function Drawer() {
  const {menuItems,privateMenuItems,anchor,appNameDrawer,drawerState, openSubMenu, clickonSubMenu} = useGlobalStore()
 
  const handleClick= ()=>{
    globalDispatch({type:actions.FIELDS, fieldName: 'openSubMenu', payload:!openSubMenu});
    globalDispatch({type:actions.FIELDS, fieldName: 'clickonSubMenu', payload:true});
  }
  const handleClickDrawer = () =>{
    if (clickonSubMenu ) {
      globalDispatch({type:actions.FIELDS, fieldName: 'drawerState', payload:true});
      globalDispatch({type:actions.FIELDS, fieldName: 'clickonSubMenu', payload:false});
    }else{
      globalDispatch({type:actions.FIELDS, fieldName: 'drawerState', payload:false})
    }
  }
  const handleCloseDrawer = () =>{
    console.log("clickOnOpenSubMenu: - close", openSubMenu)
    if (clickonSubMenu) {
      globalDispatch({type:actions.FIELDS, fieldName: 'drawerState', payload:true});
      globalDispatch({type:actions.FIELDS, fieldName: 'clikonSubMenu', payload:false});
      return;
    }
  }

  const [{isAuthenticated},]= useUserState();
  // const isAuthenticated = true;

	const globalDispatch=useGlobalDispatch();
return (
  <React.Fragment> 
    <SwipeableDrawer
        anchor={anchor}
        open={drawerState}
        onClose= {handleCloseDrawer}
        ModalProps={{ disableScrollLock: false }}
        variant = "temporary"
        >
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{  display: { xs: 'none', sm: 'block' }, textAlign:'center', mt: { xs: 'none', sm:3} }} >
            {appNameDrawer}
            <IconButton 
             sx ={{ ml:6, justifyContent : 'flex-end'}}
             onClick={()=>{globalDispatch({type:actions.FIELDS, fieldName: 'drawerState', payload:false})}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Typography>

        <Divider sx={{pt:2}}/>
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={ handleClickDrawer }
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
            onClick={handleClick}
            sx={{
              px: 3,
              pt: 2.5,
              pb: openSubMenu ? 0 : 2.5,
              '&:hover, &:focus': { '& svg': { opacity: openSubMenu ? 1 : 0.5 } },
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
                  color: openSubMenu ? 'rgba(122,132,133,0)' : 'rgba(23,84,117,0.5)',
              }}
              sx={{ my: 0 }}
            />
            <Tooltip title="Register User Options">
              <IconButton>
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0.5,
                    transform: openSubMenu ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </IconButton>
            </Tooltip>
          </ListItemButton>
            {openSubMenu && isAuthenticated && privateMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                  <ListItemButton sx={{pl:4}} component={NavLink} to={item.path} >
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