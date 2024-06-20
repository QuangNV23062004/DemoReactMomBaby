
import React from 'react'
import './Header.css'
import SideBar from '../SideBar/SideBar.jsx'
import Footer from '../Footer/Footer.jsx'

export default function Header() {
    return (
        <>
            <div className='BarWithProfile'>
                <div className='logo'>
                    <img src="../../assets/logo.jpg" className='SmallLogo' alt="" />
                </div>
                <div className='nothing'>
                </div>
                <div className='UserContainer'>
                    <div className='User'>
                        <img src="../../assets/default_avatar.jpg" className='SmallUser' alt="" />
                        <span>Quang</span>
                    </div>
                </div>
            </div>

        </>
    )
}


