import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginAdminAndStaff from './LoginForm/LoginAdminAndStaff.jsx';
import LoginForm from './LoginUser/LoginForm.jsx';
import Register from './Register/Register.jsx';
import Home from './AdminPages/Home/Home.jsx';
import AdminPages from './AdminPages/AdminPages.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forgot from './ForgotPassword/ForgetAdmin.jsx'
import Category from './AdminPages/Category/Category.jsx';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/SWP391-MomAndBaby/admin/login' element={<LoginAdminAndStaff />} />
        <Route path='/SWP391-MomAndBaby/login' element={<LoginForm />} />
        <Route path='/SWP391-MomAndBaby/admin/forgot' element={<Forgot />} />
        <Route path='/SWP391-MomAndBaby/register' element={<Register />} />
        <Route path='/SWP391-MomAndBaby/admin' element={<Home />} />
        <Route path='/SWP391-MomAndBaby/admin/*' element={<AdminPages />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
