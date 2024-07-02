import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { useState } from 'react';
import Badge from '@mui/material/Badge';

function Header() {
  const [userHovered, setUserHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/SWP391-MomAndBaby/login'); 
  };

  const toggleDropdown = () => {
    setUserHovered(!userHovered);
  };

  return (
    <div className="HeadContain">
      <div id="top-header">
        Summer Sale For Product - Free Express Delivery - DISCOUNT UP TO 50% OFF
        ! <Link to={"/SWP391-MomAndBaby/product"}>Shop now</Link>
      </div>
      <nav className="header">
        <li className="logoLi">
          <Link to={'/SWP391-MomAndBaby'}>
            <img className="logo" src="../assets/logo.jpg" alt="logo" />
          </Link>
        </li>
        <li className="nav">
          <span><Link to={'/SWP391-MomAndBaby'} id="home">Home</Link></span>
          <span><Link to={'/SWP391-MomAndBaby/product'}>Shop</Link></span>
          <span><Link to={'/SWP391-MomAndBaby/contact'}>Contact</Link></span>
          <span><Link to={'/SWP391-MomAndBaby/blog'}>Blog</Link></span>
          <span><Link to={'/SWP391-MomAndBaby/About'}>About</Link></span>
        </li>
        <li className="icon">
          <div className="search">
            <input
              className="searchInput"
              type="text"
              placeholder="What are you looking for?"
            />
            <button className="searchButton">
              <FontAwesomeIcon className="glass" icon={faSearch} />
            </button>
          </div>
        </li>
        <li className="icon">
          <Link to={'/SWP391-MomAndBaby/cart'}>
            <Badge badgeContent={4} color="error">
              <FontAwesomeIcon fontSize={20} icon={faCartShopping} style={{margin: "0px 10px"}}/>
            </Badge>
          </Link>
          <div
            className="user-icon"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <FontAwesomeIcon fontSize={20} icon={faUser} style={{margin: "0px 10px"}}/>
            {userHovered && (
              <div className="dropdown-content">
                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </li>
      </nav>
    </div>
  );
}

export default Header;
