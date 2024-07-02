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
import UpdateAccount from './AdminPages/Account/UpdateAccount.jsx';
import Header from './UserPages/Header/Header.jsx';
import Footer from './UserPages/Footer/Footer.jsx';
import Cart from './UserPages/Cart.jsx'
import AboutPage from './UserPages/AboutPage.jsx';
import DetailProduct from './UserPages/DetailProduct.jsx';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('adminUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    sessionStorage.setItem('adminUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('adminUser');
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
          <Route path='/SWP391-MomAndBaby/cart/*' element={<Cart />} />
          <Route path='/SWP391-MomAndBaby/*' element={<UserPage />}></Route>
          <Route path='/SWP391-MomAndBaby/about' element={<AboutPage />} />
          <Route path='/demo' element={<DetailProduct/>}></Route>
          <Route path='/*' element={<><Header /><NotFound /><Footer /></>}></Route>
        </Routes>
      </BrowserRouter>
  );
}
export default App;