import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useGlobalStore } from '../context/GlobalStore';

export default function Drawer() {
  const {menuItems,privateMenuItems,anchor,appNameDrawer} = useGlobalStore()
  const [state, setState] = React.useState(false);
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
        onClose={()=>setState(false)}
        onOpen={()=>setState(true)}
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
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        onClick={()=>setState(false)}
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
            {privateMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton omponent={NavLink} to={item.path} >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    </SwipeableDrawer>
    </React.Fragment>
);
} 