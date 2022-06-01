import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
        <Box sx={style}>
          Login to your account!
          <form action="" method="post">
            Please login
          </form>
        </Box>
      </Modal>
    </div>
  );
}