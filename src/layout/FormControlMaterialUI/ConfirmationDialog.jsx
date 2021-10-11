import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {actions} from '../../context/Types';
import {useGlobalStore, useGlobalDispatch} from '../../context/GlobalStore';


// const title="Are you sure you want to "
// const subTitle="Delete?"
export default function ConfirmationDialog(props) {
  const {confirmationDialog} = useGlobalStore();
  const dispatch =useGlobalDispatch();  
    
  const handleClose = () => {
    dispatch({type:actions.FIELDS, fieldName: 'confirmationDialog', payload: {...confirmationDialog,isOpen:false}})
  };

  const handleConfirm =() => {
    dispatch({type:actions.FIELDS, fieldName: 'confirmationDialog', payload: {...confirmationDialog,isOpen:false}})  
    confirmationDialog.onConfirm()
  };

  return (
    <div>
      <Dialog
        open={confirmationDialog.isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: 'snow',
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{typography:'h5', fontSize:18 }}>
          {confirmationDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{typography:'h6', 
          fontWeight:'medium', textAlign:'center'}}>
           {confirmationDialog.subTitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent:'center'}}>
          <Button variant='contained' color='primary' onClick={handleClose}>No</Button>
          <Button variant='contained' color='error' onClick={handleConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
