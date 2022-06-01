import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

interface ILoginProps {
  open: boolean,
  closeLoginForm: Function
}

export default function Login(props: ILoginProps) {
  const [open, setOpen] = React.useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.closeLoginForm();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography textAlign="center">Login to your account</Typography>
          
          <form action="" method="post">
            <TextField
              fullWidth
              // required
              id="standard-required"
              label="User name"
              variant="standard"
            />
            <TextField
              fullWidth
              // required
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
            <Button 
              fullWidth 
              variant="outlined"
              sx={{marginTop: '1rem'}}
            >Login</Button>
          </form>
        </Container>
      </Modal>
    </div>
  );
}