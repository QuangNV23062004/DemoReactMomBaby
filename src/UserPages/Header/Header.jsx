import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import "./Header.css";

function Header() {
  const [userHovered, setUserHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const userId = sessionStorage.getItem("userId");

  const fetchApi = async () => {
    try {
      const response = await fetch(cartAPI);
      const data = await response.json();
      const userCartItems = data.filter((item) => item.userId === userId);
      setCart(userCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderHistory = () => {
    navigate("/SWP391-MomAndBaby/history");
  };

  useEffect(() => {
    fetchApi(); // Fetch initial data
    const interval = setInterval(fetchApi, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [userId]);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/SWP391-MomAndBaby/login");
  };

  const toggleDropdown = () => {
    setUserHovered(!userHovered);
  };

  const handleLogin = () => {
    navigate("/SWP391-MomAndBaby/login");
  };

  const handleSearch = () => {
    navigate(`/SWP391-MomAndBaby/product?search=${searchQuery}`);
  };

  return (
    <div className="HeadContain">
      <div id="top-header">
        Summer Sale For Product - Free Express Delivery - DISCOUNT UP TO 50% OFF!{" "}
        <Link to={"/SWP391-MomAndBaby/product"}>Shop now</Link>
      </div>
      <nav className="header">
        <li className="logoLi">
          <Link to={"/SWP391-MomAndBaby"}>
            <img className="logo" src="../assets/logo.jpg" alt="logo" />
          </Link>
        </li>
        <li className="nav">
          <span>
            <Link to={"/SWP391-MomAndBaby"} id="home">
              Home
            </Link>
          </span>
          <span>
            <Link to={"/SWP391-MomAndBaby/product"}>Shop</Link>
          </span>
          <span>
            <Link to={"/SWP391-MomAndBaby/contact"}>Contact</Link>
          </span>
          <span>
            <Link to={"/SWP391-MomAndBaby/blog"}>Blog</Link>
          </span>
          <span>
            <Link to={"/SWP391-MomAndBaby/About"}>About</Link>
          </span>
        </li>
        <li className="icon">
          <div className="search">
            <input
              className="searchInput"
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button className="searchButton" aria-label="Search button" onClick={handleSearch}>
              <FontAwesomeIcon className="glass" icon={faSearch} />
            </button>
          </div>
        </li>
        <li className="icon">
          <Link to={"/SWP391-MomAndBaby/cart"}>
            <Badge badgeContent={cart.length} color="error">
              <FontAwesomeIcon fontSize={20} icon={faCartShopping} style={{ margin: "0px 10px" }} />
            </Badge>
          </Link>
          <div
            className="user-icon"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <FontAwesomeIcon fontSize={20} icon={faUser} style={{ margin: "0px 10px" }} />
            {userHovered && (
              <div className="dropdown-content">
                {userId == null ? (
                  <div className="dropdown-item" onClick={handleLogin}>
                    Login
                  </div>
                ) : (
                  <>
                    <div className="dropdown-item" onClick={handleOrderHistory}>
                      Order history
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </li>
      </nav>
    </div>
  );
}

export default Header;
