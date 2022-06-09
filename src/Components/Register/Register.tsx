import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const [ enteredPassword, setEnteredPassword ] = React.useState('');
  const [ enteredRepeatPassword, setEnteredRepeatPassword ] = React.useState('');
  const [ invalidPassword, setInvalidPassword ] = React.useState(false);
  const [ passwordMatch, setPasswordMatch ] = React.useState(true);

  const invalidPasswordMessage = 'Password should be at least 8 symbols and contain at least one capital letter and number';
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.closeRegisterForm();
  };

  const controlUserName = (value: string) => {
    setEnteredUserName(value);
  }

  const controlPassword = (value: string) => {
    setEnteredPassword(value);
  }

  const controlPasswordRepeat = (value: string) => {
    setEnteredRepeatPassword(value);
  }

  const testNameSymbols = () => {
    const regex = new RegExp(/^[0-9a-zA-Z]+$/g);
    if (!regex.test(enteredUserName)) {
      setInvalidUserName(true);
      return false;
    } 

    setInvalidUserName(false);
    return true;
  }

  const validateUserName = () => {
    if (testNameSymbols()) {
      fetch('http://localhost:8000/usernames', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "user_name": enteredUserName
        })
      })
        .then((res) => res.json())
        .then((message) => {
          console.log(message);
          if (!message.isFree) {
            setUserNameExists(true);
            return false;
          }
          setUserNameExists(false);
          return true;
        })
        .catch((err) => console.log(err));
    }
    return false;
  }

  const validatePassword = () => {
    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g);
    if (regex.test(enteredPassword)) {
      setInvalidPassword(false);
      return true;
    }
    setInvalidPassword(true);
    return false;
  }

  const checkMatch = () => {
    if (enteredPassword === enteredRepeatPassword) {
      setPasswordMatch(true);
      return true;
    };
    setPasswordMatch(false);
  }

  const validateAndCreateUser = () => {
    if (validateUserName() && validatePassword() && checkMatch()) {
      fetch('http://localhost:8000/users/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "user_name": enteredUserName,
          "password": enteredPassword
        })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            navigate('/', {replace: true});
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
              error = {invalidPassword}
              helperText = {invalidPassword? invalidPasswordMessage : ''}
              required
              id="password_1"
              label="Password"
              type="password"
              variant="standard"
              onBlur={validatePassword}
              onChange={(event) => controlPassword(event.target.value)}
            />
            <TextField
              fullWidth
              error = {!passwordMatch}
              helperText = {passwordMatch? '' : 'Passwords do no match'}
              required
              id="password_2"
              label="Repeat password"
              type="password"
              variant="standard"
              onBlur={checkMatch}
              onChange={(event) => controlPasswordRepeat(event.target.value)}
            />
            <Button 
              fullWidth 
              variant="outlined"
              sx={{marginTop: '1rem'}}
              onClick={validateAndCreateUser}
            >Create account</Button>
          </form>
        </Container>
      </Modal>
    </div>
  );
}