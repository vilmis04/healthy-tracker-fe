import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
// import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import FloatingAddButton from "./Components/FloatingAddButton/FloatingAddButton";
import Login from './Components/Login/Login';

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

  const closeLoginForm = () => {
    setLoginFormOpen(false);
  }

  return (
    <>
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
      />
      {loginFormOpen && <Login open={loginFormOpen} closeLoginForm={closeLoginForm} />}
      {user.loggedIn && <FloatingAddButton />}
    </>
  );
}

export default App;