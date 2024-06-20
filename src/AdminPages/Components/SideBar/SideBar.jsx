

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';


import React from 'react'
import './SideBar.css'
function SideBar() {
    return (
        <div className='SideBar'>
            <div className='sideButton'>
                <a href="#" className='sideButtonLink'>Home</a>
            </div>
            <div className='sideButton'>
                <a href="#" className='sideButtonLink'>
                    <FontAwesomeIcon className='MessageIcon' icon={faMessage} />
                Go to chat
                </a>
            </div>
            <div className='sideButton'>
                <a href="#" className='sideButtonLink'>Category</a>
            </div>
            <div className='sideButton'>
                <a href="#" className='sideButtonLink'>Brand</a>
            </div>
            <div className='sideButton'>
                <a href="#" className='sideButtonLink'>Producer</a>
            </div>
            <div className='sideButton'>
                <a href="#" className='sideButtonLink'>Product</a>
            </div>
            <div className='sideButton'>
                <a href="#" className='sideButtonLink'>Account</a>
            </div>
        </div>
    )
}

export default SideBar