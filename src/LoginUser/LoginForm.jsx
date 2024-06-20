import React from 'react'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import './LoginForm.css'
export default function LoginForm() {
  return (
    <><Header className="Head"/>
    <div className='Bigger'>
    <div className='Container'>
      
        <div className='ImageHalf'>
        <img src='../assets/milk.png'/>
        </div>
        <div className='FormHalf'>
          <div className='LoginForm'>
            <h1>Login to Exclusive</h1>
            <p>Enter your details below</p>
            <input type="text" name="" id="" placeholder='Username' className='inputbox'/><br/>
            <input type="text" name="" id="" placeholder='Password' className='inputbox'/><br/>
            <div className='Login'>
              <button className='LoginButton'>Login</button> 
            <a href="#" className='BellowLink'><b>Forget Password?</b></a><br />
            </div>
            <div className='Register'>
            <span >Create new account <a href="register" className='BellowLink'><b>Register</b></a></span>
            </div>
            </div>
        </div>
    </div>
    </div>
    <Footer className="Foot" /></>

  )
}
