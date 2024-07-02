import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginAdmin.css';

export default function LoginAdmin({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          
            const response = await axios.get('https://66801b4556c2c76b495b2d81.mockapi.io/Account', {
                params: { username }
            });
            const user = response.data.find(
                user => user.username === username && user.password === password && user.role === 'admin'
            );
            if (user) {
                localStorage.setItem('adminUser', JSON.stringify(user)); 
                onLogin(user); 
                navigate('/SWP391-MomAndBaby/admin');
            } else {
                alert('Invalid username or password for admin');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        }
    };

    return (
        <div className="full-page">
            <div className='full-page-wrapper'>
                <div className='center'>
                    <h2>SIGN IN NOW</h2><br />
                    <input
                        type="text"
                        name="username"
                        placeholder='USERNAME'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        name="password"
                        placeholder='PASSWORD'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <div className='Forgot'>
                        <a href="forgot" className='forgot'>Forgot Password?</a><br />
                    </div>
                    <div className='LoginDiv'>
                        <button className='login' onClick={handleLogin}>SIGN IN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
