import { Routes, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";

function App() {
  const [ user, setUser ] = useState({name: 'Mario'});
  // const [ user, setUser ] = useState(undefined);

  return (
    <>
      <Navbar userLoggedIn={user} />
      <Home />
    </>
  );
}

export default App;