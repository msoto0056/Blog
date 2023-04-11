import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


export const AppbarContainer = styled(Box)(() => ({    
    display: 'flex',
    marginTop: 4,
    justifyContent: 'center',
  alignItems: 'center',
    padding: '2px 8px'
}));

export const IconButtonWebSettings = styled (IconButton) (() => ({
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
}));