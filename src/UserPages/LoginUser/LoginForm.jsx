import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [Account, setAccount] = useState([]);
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/Account/";
  const nav = useNavigate();

  const fetchApi = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => ({ ...item, selected: false }));
        setAccount(updatedData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleLogin = () => {
    const user = Account.find(user => user.username === username && user.password === password && user.role === "user");
    if (user) {
      // Store the user ID in local storage
      sessionStorage.setItem('userId', user.id);
      //getItem:
      //const userId = sessionStorage.getItem('userId');

      // Redirect to the appropriate page or perform necessary actions
      console.log("Login successful");
      console.log(sessionStorage.getItem('userId'));
      setLoginError('');
      nav('/SWP391-MomAndBaby/');

    } else {
      setLoginError('Invalid username, password, or you do not have the correct role.');
    }
  };

  return (
    <>
      <Header className="Head" />
      <div className='Bigger'>
        <div className='Container'>
          <div className='ImageHalf'>
            <img src='../assets/milk.png' alt='Login Illustration' />
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
