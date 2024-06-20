import React from 'react'
import './LoginAdmin.css'

export default function LoginAdminAndStaff() {
    return (
        <>
            <div className='full-page-wrapper'>
                <div className='center'>
                    <h2>SIGN IN NOW</h2><br />
                    <input type="text" name="" id="" placeholder='USERNAME' className='inputboxLogin' /><br />
                    <input type="password" name="" id="" placeholder='PASSWORD' className='inputboxLogin' /><br />
                    <div className='Forgot'>
                        <a href="forgot" className='forgot'>Forgot Password?</a><br />
                    </div>
                    <div className='LoginDiv'>
                        <button className='login'>SIGN IN</button></div>
                </div>

            </div>
        </>
    )
}
