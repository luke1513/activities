import { useState } from 'react'

const LogIn = ({onLogIn, failedLogIn}) => {
  const [emailValue, setEmailValue] = useState('')
  const [passValue, setPassValue] = useState('')

  return (
    <div className='login-wrapper'>
      <div className="login">
        <div className="enter-login">Email: </div>
        <input value={emailValue} className="login-input" onChange={(e) => setEmailValue(e.target.value)} />
        <div className="enter-login">Password: </div>
        <input value={passValue} className="login-input" type="password" onChange={(e) => setPassValue(e.target.value)} />
        <button className='save' onClick={() => onLogIn(emailValue, passValue)}>Log In</button>
        {failedLogIn && <p className="login-failed">Login Failed</p>}
      </div>
    </div>
  )
}

export default LogIn