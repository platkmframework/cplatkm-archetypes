import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); 
export const  ConfirmDialog = ({openDelConfirm, handleYes, text = 'Do you want to remove the record?'})=> { 
 
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(openDelConfirm.open)
    {
      setOpen(true)
    }
  }, [openDelConfirm])
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (event) => {
    handleYes(event);
    setOpen(false);
  };

  return (
    <div>
       
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  style={{textTransform:'none'}}  onClick={handleConfirm}>Confirmar</Button>
          <Button  style={{textTransform:'none'}} onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
