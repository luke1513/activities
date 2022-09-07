import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import postLogin from './api/postLogin'
import Activity from './components/Activity';
import LogIn from './components/LogIn';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [failedLogIn, setFailedLogIn] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem('jwt'))
      setLoggedIn(true)
  }, [])

  const handleLogIn = (email, pass) => {
    postLogin(email, pass)
    .then(res => {
      console.log(res)
      window.localStorage.setItem('jwt', res.jwt)
      window.dispatchEvent(new Event("storage"));
      setLoggedIn(true)
      setFailedLogIn(false)
    })
    .catch(() => {
      setFailedLogIn(true)
    })
  }

  return (
    <div className="App">
      {!loggedIn && <LogIn onLogIn={handleLogIn} failedLogIn={failedLogIn} />}
      <Routes>
        <Route path='activities/:id' element={<Activity />} />
      </Routes>
    </div>
  );
}

export default App;
