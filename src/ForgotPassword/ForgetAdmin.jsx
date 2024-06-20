import React from 'react'
import './ForgetAdmin.css'
import { useState } from 'react'
export default function LoginAdminAndStaff() {
    const [isAdmin, setIsAdmin] = useState(true);
    return (
        <>
            <div className='full-page-wrapper'>
                <div className='center'>

                    <h2>FORGET PASSWORD {isAdmin === true ? <></> : <>STAFF</>}</h2><br />
                    <input type="text" name="" id="" placeholder='EMAIL' className='inputboxForget' /><br />
                    <input type="password" name="" id="" placeholder='USERNAME' className='inputboxForget' /><br />
                    <div className='right'>
                    <a href="#" className='forgot'>Go to login</a><br />
                    </div>
                    <div className='Reset'>
                    <button className='ButtonReset'>RESET PASSWORD</button>
                    </div>

                </div>
            </div>
        </>
    )
}
