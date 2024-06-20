import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCartShopping,faUser } from '@fortawesome/free-solid-svg-icons';


function Header() {
  return (
    <div className='HeadContain'>
      <div id="top-header">Summer Sale For Product - Free Express Delivery - DISCOUNT UP TO 50% OFF ! Shopnow</div>
      <nav>
        <li className='logoLi'><img className='logo' src='../assets/logo.jpg' alt=''></img></li>
        <li className='nav'>
        <span className='home'>Home</span>
        <span>Shop</span>
        <span>Contact</span>
        <span>About</span></li>
        <li>
          <div className='search'>
            <input className='searchInput' placeholder='What are you looking for?' />
            <FontAwesomeIcon className="glass" icon={faSearch} /> 
            
          </div>
        </li>
        <li><FontAwesomeIcon className='icon' icon={faCartShopping} />
        <FontAwesomeIcon className='icon' icon={faUser} /></li>
        
      </nav>
    </div>
  );
}

export default Header;
