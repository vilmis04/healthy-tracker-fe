import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
// import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import FloatingAddButton from "./Components/FloatingAddButton/FloatingAddButton";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

export interface IUser {
  loggedIn: boolean,
  name?: string,
  token?: string
}

function App() {
  const [ user, setUser ]: [IUser, Function] = React.useState({
    loggedIn: true,
    name: 'Mario'});

  const [ loginFormOpen, setLoginFormOpen ] = React.useState(false);
  const [ registerFormOpen, setRegisterFormOpen ] = React.useState(false);

  const handleLogout = () => {
    setUser({
      loggedIn: false
    });
  }

  const handleLogin = () => {
    setLoginFormOpen(true);
    setUser({
      loggedIn: true,
      name: 'Mario'
    });
  }

  const handleRegister = () => {
    setRegisterFormOpen(true);
  }

  const closeRegisterForm = () => {
    setRegisterFormOpen(false);
  }

  const closeLoginForm = () => {
    setLoginFormOpen(false);
  }

  return (
    <>
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleRegister={handleRegister}
        handleLogin={handleLogin}
      />
      {loginFormOpen && !registerFormOpen && <Login open={loginFormOpen} closeLoginForm={closeLoginForm} />}
      {registerFormOpen && !loginFormOpen && <Register open={registerFormOpen} closeRegisterForm={closeRegisterForm} />}
      {user.loggedIn && <FloatingAddButton />}
    </>
  );
}

export default App;