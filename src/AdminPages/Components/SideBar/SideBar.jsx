import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  return (
    <div className='SideBar'>
      <div className='sideButton'>
        <Link to='/SWP391-MomAndBaby/admin'>Home</Link>
      </div>
      <div className='sideButton'>
        <Link to='/SWP391-MomAndBaby/admin/chat'>
          <FontAwesomeIcon className='MessageIcon' icon={faMessage} />
          Go to chat
        </Link>
      </div>
      
      <div className='sideButton'>
        <Link to='/SWP391-MomAndBaby/admin/product'>Product</Link>
      </div>
      <div className='sideButton'>
        <Link to='/SWP391-MomAndBaby/admin/account'>Account</Link>
      </div>
    </div>
  );
}

export default SideBar;
