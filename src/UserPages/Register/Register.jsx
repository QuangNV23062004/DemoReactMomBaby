import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import '../LoginUser/LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/Account/";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, 'Fullname must be at least 5 characters')
        .required('Fullname is required'),
      username: Yup.string()
        .min(5, 'Username must be at least 5 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      const newUser = {
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
        fullname: values.fullname,
        role: 'user',
        avatar: '/assets/default_avatar.jpg',
      };

      try {
        const response = await fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          navigate('/SWP391-MomAndBaby/login');
        } else {
          console.error('Failed to create account');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <>
      <Header className="Head" />
      <div className='Bigger'>
        <div className='Container'>
          <div className='ImageHalf'>
            <img src='../assets/milk.png' alt="Register" />
          </div>
          <div className='FormHalf'>
            <div className='LoginForm'>
              <h1>Create an account</h1>
              <p>Enter your details below</p>
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  name="fullname"
                  placeholder='Fullname'
                  className='inputbox'
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div className="error">{formik.errors.fullname}</div>
                ) : null}
                <br />
                <input
                  type="text"
                  name="username"
                  placeholder='Username'
                  className='inputbox'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="error">{formik.errors.username}</div>
                ) : null}
                <br />
                <input
                  type="text"
                  name="email"
                  placeholder='Email'
                  className='inputbox'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
                <br />
                <input
                  type="text"
                  name="phone"
                  placeholder='Phone'
                  className='inputbox'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  className='inputbox'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
                <br />
                <div className="UpRegisterButton">
                  <button type="submit" className='RegisterButton'>Register</button>
                </div>
              </form>
              <div className='Register'>
                <span>
                  Already have an account? <Link to="/SWP391-MomAndBaby/login" className='BellowLink'><b>Login</b></Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="Foot" />
    </>
  );
}
