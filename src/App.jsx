import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAdmin from './LoginForm/LoginAdmin';
import LoginForm from './UserPages/LoginUser/LoginForm';
import Forgot from './ForgotPassword/ForgetAdmin.jsx';
import Register from './UserPages/Register/Register';
import AdminPages from './AdminPages/AdminPages.jsx';
import UserPage from './UserPages/UserPage.jsx';
import NotFound from './NotFound.jsx';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('adminUser');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogin = (user) => {
        setUser(user);
        localStorage.setItem('adminUser', JSON.stringify(user));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('adminUser');
        navigate('/SWP391-MomAndBaby/admin/login'); // Redirect to login page
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/SWP391-MomAndBaby/admin/login' element={<LoginAdmin onLogin={handleLogin} />} />
                <Route path='/SWP391-MomAndBaby/login' element={<LoginForm onLogin={handleLogin} />} />
                <Route path='/SWP391-MomAndBaby/admin/forgot' element={<Forgot />} />
                <Route path='/SWP391-MomAndBaby/register' element={<Register />} />
                <Route path='/SWP391-MomAndBaby/admin/*' element={user ? <AdminPages onLogout={handleLogout} /> : <Navigate to='/SWP391-MomAndBaby/admin/login' />} />
                <Route path='/SWP391-MomAndBaby/*' element={user ? <UserPage /> : <Navigate to='/SWP391-MomAndBaby/login' />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
