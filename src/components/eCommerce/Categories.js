import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {useProductState} from '../../context/eCommerce/ProductStore';
import {actions} from '../../context/Types';
import {ProductViewButton,  SquareAvatar } from '../../styles/product'


const Categories = ({ handleCategorySelection }) => {
  const [{categories},dispatch] = useProductState();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation()
  const HandleCategory = (category) => {
    // dispatch({type:actions.FIELDS, fieldName: 'category', payload: category.category});
    dispatch({type:actions.FIELDS, fieldName: 'categoryId', payload: category.id});
    handleCategorySelection(category)
  }
  const listPosition = matches ? { top: '50px', left: '20px' } : { top: '40px', left: '30px' };
  const listItemSize = matches ? 40 : 55;
  const listZIndex = matches ? 1 : 'auto'; // Set z-index to 1 in responsive mode

  return (
    <List
      dense
      sx={{
        position: 'relative', // Change position to relative
        width: '100%',
        maxWidth: 260,
        bgcolor: 'background.paper',
        top: listPosition.top, // Maintain the desired top position
        left: listPosition.left, // Maintain the desired left position
        zIndex: listZIndex, // Apply z-index property
      }}
      subheader={
        <ListSubheader
        sx={{
          bgcolor: '#333', // Set the desired dark background color using a CSS color value
          height: '25px', // Set the desired height of the black area
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
          <Typography 
              variant="h4"
              textAlign="center"
              fontFamily="Fauna One"
              fontWeight="bold"
              color="white" // Set the desired text color
            >
            {t('categoryMsg')}
          </Typography>
        </ListSubheader>
      }
    >
        {categories.map((category) => {
      const labelId = `category-${category.category}`;
      return (
        <ListItem
          key={category.id}
          disablePadding
        >
          <ListItemButton 
          sx={{
            cursor: "pointer",
            bgcolor: '#F5F5F5',
            '&:hover': {
              bgcolor: '#e6f7ff', // Set the desired background color when hovering #E0E0E0
            },
              // Add the touch-action property to ensure correct hover behavior
              touchAction: 'manipulation',
          }}
          onClick={() => HandleCategory(category)}
          > 
            <ListItemAvatar>
              <SquareAvatar
                alt={`Category-${category.id}`}
                src={category.image}
                sx={{ width: listItemSize, height: listItemSize, mr: 1 }}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={category.category} />
          </ListItemButton>
        </ListItem>
      );
    })}
  </List>
);
}

export default Categories