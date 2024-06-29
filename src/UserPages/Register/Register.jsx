


import React from 'react'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import '../LoginUser/LoginForm.css'
export default function Register() {
  return (
        
    <><Header className="Head"/>
    <div className='Bigger'>
    <div className='Container'>
      
        <div className='ImageHalf'>
        <img src='../assets/milk.png'/>
        </div>
        <div className='FormHalf'>
          <div className='LoginForm'>
            <h1>Create an account</h1>
            <p>Enter your details below</p>
            <input type="text" name="" id="" placeholder='Fullname' className='inputbox'/><br/>
            <input type="text" name="" id="" placeholder='Username' className='inputbox'/><br/>
            <input type="text" name="" id="" placeholder='Email' className='inputbox'/><br/>
            <input type="text" name="" id="" placeholder='Phone' className='inputbox'/><br/>
            <input type="text" name="" id="" placeholder='Password' className='inputbox'/><br/>
            <div className="UpRegisterButton">
              <button className='RegisterButton'>Login</button> 
            
            </div>
            <div className='Register'>
            <span >Already have account <a href="login" className='BellowLink'><b>Login</b></a></span>
            </div>
            </div>
        </div>
    </div>
    </div>
    <Footer className="Foot" /></>

  )
}
