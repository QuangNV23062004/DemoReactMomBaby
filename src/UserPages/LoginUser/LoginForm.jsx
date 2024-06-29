import React, { useState } from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import './LoginForm.css';
import Account from '../../Resources/Account.jsx';
export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const handleLogin = () => {
    const user = Account.find(user => user.username === username && user.password === password && user.role === 2);
    if (user) {
      // Redirect to the appropriate page or perform necessary actions
      console.log("Login successful");
      setLoginError('');
      
    } else {
      setLoginError('Invalid username, password, or you do not have the correct role.');
    }
  };

  return (
    <>
      <Header className="Head"/>
      <div className='Bigger'>
        <div className='Container'>
          <div className='ImageHalf'>
            <img src='../assets/milk.png' alt='Login Illustration'/>
          </div>
          <div className='FormHalf'>
            <div className='LoginForm'>
              <h1>Login to Exclusive</h1>
              <p>Enter your details below</p>
              <input 
                type="text" 
                placeholder='Username' 
                className='inputbox' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              /><br/>
              <input 
                type="password" 
                placeholder='Password' 
                className='inputbox' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              /><br/>
              <div className='Login'>
                <button className='LoginButton' onClick={handleLogin}>Login</button> 
                <a href="#" className='BellowLink'><b>Forget Password?</b></a><br />
              </div>
              {loginError && <p className='error'>{loginError}</p>}
              <div className='Register'>
                <span>Create new account <a href="register" className='BellowLink'><b>Register</b></a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="Foot" />
    </>
  );
}
