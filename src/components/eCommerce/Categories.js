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



const Categories = () => {
  const [{categories},dispatch] = useProductState();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation()
  const HandleCategory = (category) => {
    dispatch({type:actions.FIELDS, fieldName: 'category', payload: category.category});
    dispatch({type:actions.FIELDS, fieldName: 'categoryId', payload: category.id});
  }

 


  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}

    subheader={<ListSubheader>
        <Typography fontFamily={"Fauna One"} fontWeight={"Bold"} variant="h4" >  {t('categoryMsg')}</Typography></ListSubheader>}
    >
        {categories.map((category) => {
      const labelId = `category-${category.category}`;
      return (
        <ListItem
          key={category.id}
          disablePadding
        >
          <ListItemButton sx={{cursor:"pointer", bgcolor:'#F5F5F5'}}onClick={()=>HandleCategory(category)}>
            <ListItemAvatar>
              <Avatar
                alt={`Category-${category.id}`}
                src={category.image}
                sx={{width: matches?40:55, height: matches?40:55, mr:1 }}
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