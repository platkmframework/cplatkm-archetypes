import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const PopupDialog = ({open, setOpen, maxWidth='lg', title='Popup', children, customHandler})=> {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 
  const handleClose = (event) => {
    setOpen(false);
    if(customHandler != undefined) customHandler(event);
  };

  return (
    <div> 
      <Dialog
        fullWidth={false}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title" >
          <DialogTitle id="responsive-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent> 
            {children} 
        </DialogContent> 
      </Dialog>
    </div>
  );
}
