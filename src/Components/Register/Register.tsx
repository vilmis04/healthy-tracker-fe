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

interface IRegisterProps {
  open: boolean,
  closeRegisterForm: Function
}

export default function Register(props: IRegisterProps) {
  const [ open, setOpen ] = React.useState(props.open);
  const [ userNameExists, setUserNameExists ] = React.useState(false);
  const [ enteredUserName, setEnteredUserName ] = React.useState('');
  const [ invalidUserName, setInvalidUserName ] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.closeRegisterForm();
  };

  const controlUserName = (value: string) => {
    setEnteredUserName(value);
  }

  const testNameSymbols = () => {
    const regex = new RegExp(/^[0-9a-zA-Z]+$/g);
    if (!regex.test(enteredUserName) && !invalidUserName) {
      setInvalidUserName(true);
      return false;
    } 
    if (invalidUserName) {
      setInvalidUserName(false);
    }
    return true;
  }

  const validateUserName = () => {
    if (testNameSymbols()) {
      fetch('http://localhost:8000/users')
        .then((res) => res.json())
        .then((users) => {
          if (users.includes(enteredUserName) && !userNameExists) {
            setUserNameExists(true);
          } else if (!users.includes(enteredUserName) && userNameExists) {
            setUserNameExists(false);
          }
        })
        .catch((err) => console.log(err));
    }
    

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          maxWidth: 400,
          margin: '0 auto'
        }}
      >
        <Container sx={style}>
          <Typography textAlign="center">Create new account:</Typography>
          
          <form action="" method="post">
            <TextField
              fullWidth
              error = {userNameExists || invalidUserName}
              helperText = {invalidUserName? 'Only letters and numbers can be used' 
                : userNameExists ? 'User name taken. Try a different one.' : ''}
              required
              id="user_name"
              label="User name"
              variant="standard"
              onBlur={validateUserName}
              onChange={(event) => controlUserName(event.target.value)}
            />
            <TextField
              fullWidth
              required
              id="password_1"
              label="Password"
              type="password"
              // autoComplete="current-password"
              variant="standard"
            />
            <TextField
              fullWidth
              required
              id="password_2"
              label="Repeat password"
              type="password"
              // autoComplete="current-password"
              variant="standard"
            />
            <Button 
              fullWidth 
              variant="outlined"
              sx={{marginTop: '1rem'}}
            >Create account</Button>
          </form>
        </Container>
      </Modal>
    </div>
  );
}