import PropTypes from 'prop-types';
// import Button from './Buttons';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Badge from '@material-ui/core/Badge';

import { useLocation } from 'react-router-dom';
import { usePeopleState} from '../context/people/PeopleStore';
import  Typography from '@material-ui/core/Typography';


const Header = ({title } ) => {

  const [{peopleCount},] = usePeopleState();
    const location = useLocation ()
    return (
        <header className="header">
          <Badge badgeContent={peopleCount} color="primary" anchorOrigin={{vertical: 'top',horizontal: 'left'}}> 
            <AssignmentOutlinedIcon  />
          </Badge>
          <Typography variant='h5'>{title}&nbsp;</Typography>  
          {location.pathname === '/' &&  
          <Button href='/addPeople' variant={"contained"} color="primary" size="small"  
              endIcon={<AddCircleOutlineOutlinedIcon/>}>
              Add        
          </Button> 
          }
        </header>
    )
}



Header.defaultProps = {
    title: 'No Title pass in App.js',
} 

Header.propTypes={
    title: PropTypes.string
}
export default Header
