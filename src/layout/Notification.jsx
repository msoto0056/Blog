import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import {useGlobalStore, useGlobalDispatch} from '../context/GlobalStore';

import { actions } from '../context/Types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification(props) {

    const {notify} = useGlobalStore();
    const dispatch = useGlobalDispatch();


    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({type:actions.FIELDS, fieldName: 'notify', payload: {...notify,isOpen:false}})
    }
    
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose} >
            <Alert
                severity={notify.type}
                onClose={handleClose}
                sx={{ width: '100%' }} >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}