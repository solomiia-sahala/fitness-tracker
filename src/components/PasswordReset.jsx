import { withFirebase } from './hocComponents/withFirebase';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
  Button,
  Link
} from '@mui/material';
import { useState } from 'react';

function PasswordReset(props) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [state, setState] = useState({email: '', error: null})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({email: '', error: null})
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  }

  const handleSubmit = () => {
    props.firebase.resetPassword(state.email)
      .then(() => {
        setState({email: '', error: null });
        handleClose();
        setOpenAlert(true);
      })
      .catch(error => {
        setState({ error });
      });
  };

  const isInvalid = !state.email;

  return (
    <>
      <Link to="" onClick={handleClickOpen}>
        Forgot password?
      </Link>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset my password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here for the instructions on how to reset.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          {state.error && <p style={{color:'red'}}>{state.error.message}</p>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isInvalid} type="submit" color="primary">
            Reset password
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openAlert}
        autoHideDuration={6000}
        message="Password reset link successfully sent"
      />
    </>
  )
}

export default withFirebase(PasswordReset);