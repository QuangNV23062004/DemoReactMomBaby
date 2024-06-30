import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAdminAndStaff from './LoginForm/LoginAdminAndStaff';
import LoginForm from './UserPages/LoginUser/LoginForm';
import Forgot from './ForgotPassword/ForgetAdmin.jsx';
import Register from './UserPages/Register/Register';
import Home from './AdminPages/AdminPages.jsx';
import AdminPages from './AdminPages/AdminPages.jsx';
import UserPage from './UserPages/UserPage.jsx'
import NotFound from './NotFound.jsx';
import UpdateAccount from './AdminPages/Account/UpdateAccount.jsx';
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
        <Route path='/SWP391-MomAndBaby/*' element= {<UserPage/> }></Route>
        <Route path='/*' element={<NotFound/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
