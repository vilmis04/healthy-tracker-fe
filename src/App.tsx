import { Routes, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";
import FloatingAddButton from "./Components/FloatingAddButton/FloatingAddButton";

export interface IUser {
  loggedIn: boolean,
  name?: string,
  token?: string
}

function App() {
  const [ user, setUser ]: [IUser, Function] = useState({
    loggedIn: true,
    name: 'Mario'});

  const handleLogout = () => {
    setUser({
      loggedIn: false
    });
  }

  const handleLogin = () => {
    setUser({
      loggedIn: true,
      name: 'Mario'
    });
  }

  return (
    <>
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
      />
      <Home />
      <FloatingAddButton />
    </>
  );
}

export default App;
// export IUser;