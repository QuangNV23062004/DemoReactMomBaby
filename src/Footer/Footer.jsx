import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons'
export default function Footer() {
  return (
    <>

      <div className='footerContainer'>
        <div className='support'>
          <h2><b>SUPPORT</b></h2>
          <br />
          
          <span> <FontAwesomeIcon icon={faLocationPin} className='icon'/></span>FPT University Hồ Chí Minh
          <br />
          
          <span><FontAwesomeIcon icon={faPhone} className='icon'/>0938680987</span>
          <br />
          
          <span><FontAwesomeIcon icon={faEnvelope} className='icon'/></span> momandbabies.company@gmail.com
        </div>
        <div className='account'>
          <h2><b>ACCOUNT</b></h2><br />
          <span>My Account</span><br />
          <span>Login / Register</span><br />
          <span>Cart</span><br />
          <span>Shop</span><br />
        </div>
        <div className='quicklink'>
          <h2><b>QUICK LINK</b></h2>
          <span>About</span><br />
          <span>Contact</span> <br />
          <span>Blog</span><br />
        </div>
        <div className='socialContact'>
          <h2><b>SOCIAL <br /> CONTACT</b></h2>
          <img src="../assets/socialcontact1.png" alt="" />
        </div>
      </div>
      <div className='lower'>
      <div className='footerImage'>
        <img src="../assets/footer1.png" alt="" />
        
      </div>
      <span className='final'>Copyright © 2024 All rights reserved | Design by  Group 8</span>
      </div>
    </>
  )
}
