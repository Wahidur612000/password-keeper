import React from 'react';
import PasswordKeeper from './component/Passwordkeeper';
import AllPasswords from './component/AllPassword';
import { PasswordProvider } from './component/context/PasswordContext';
import './App.css';

function App() {
  return (
    <PasswordProvider>
      <div className="App">
        <PasswordKeeper />
        <AllPasswords />
      </div>
    </PasswordProvider>
  );
}

export default App;
