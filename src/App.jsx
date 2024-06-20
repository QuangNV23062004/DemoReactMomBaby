import { useState } from 'react'
import Forgot from './ForgotPassword/ForgetAdmin.jsx'
import './App.css'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginAdminAndStaff from './LoginForm/LoginAdminAndStaff.jsx'
import LoginForm from './LoginUser/LoginForm.jsx'
import ForgotAdmin from './ForgotPassword/ForgetAdmin.jsx'
import Register from './Register/Register.jsx'
import Footers from './AdminPages/Components/Footer/Footer.jsx'
import Header from './AdminPages/Components/Header/Header.jsx'
import Home from './AdminPages/Home/Home.jsx'
import Category from './AdminPages/Category/Category.jsx'
function App() {
  return (
    <>


 <BrowserRouter>
    <Routes>
      <Route path='/SWP391-MomAndBaby/admin/login' element={<LoginAdminAndStaff/>} />
      <Route path='/SWP391-MomAndBaby/login' element={<LoginForm/>}/>
      <Route path='/SWP391-MomAndBaby/admin/forgot' element={<Forgot/>}/>
      <Route path='/SWP391-MomAndBaby/register' element={<Register/>} />
      <Route path='/SWP391-MomAndBaby/admin' element={<Home/>} />
      <Route path='/' element={<Category/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}


export default App
