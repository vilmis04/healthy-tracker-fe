import { useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const content = loggedIn ? <Dashboard /> : <Login />;
  return (
    <div>
      { content }
    </div>
  );
}
