import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faCcVisa,
  faCcAmex,
  faCcDiscover,
  faCcMastercard,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="footerContainer">
        <div className="support">
          <h2>
            <b>SUPPORT</b>
          </h2>
          <br />
          <span>
            {" "}
            <FontAwesomeIcon icon={faLocationPin} className="icon" />
          </span>
          FPT University Hồ Chí Minh
          <br />
          <span>
            <FontAwesomeIcon icon={faPhone} className="icon" />
            0938680987
          </span>
          <br />
          <span>
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
          </span>{" "}
          momandbabies.company@gmail.com
        </div>
        <div className="account">
          <h2>
            <b>ACCOUNT</b>
          </h2>
          <br />
          <span><Link to={'/SWP391-MomAndBaby/'}>My Account</Link></span>
          <br />
          <span><Link to={'/SWP391-MomAndBaby/'}>Login / Register</Link></span>
          <br />
          <span><Link to={'/SWP391-MomAndBaby/'}>Cart</Link></span>
          <br />
          <span><Link to={'/SWP391-MomAndBaby/'}>Shop</Link></span>
          <br />
        </div>
        <div className="quicklink">
          <h2>
            <b>QUICK LINK</b>
          </h2>
          <span><Link to={'/SWP391-MomAndBaby/'}>About</Link></span>
          <br />
          <span><Link to={'/SWP391-MomAndBaby/'}>Contact</Link></span> <br />
          <span><Link to={'/SWP391-MomAndBaby/'}>Blog</Link></span>
          <br />
        </div>
        <div className="socialContact">
          <h2>
            <b>
              SOCIAL CONTACT
            </b>
          </h2>
          <ul>
            <li>
              <a href="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://x.com/?lang=vi">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.linkedin.com/">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="lower">
        <div className="footerImage">
          <ul className="footer-payments">
            <li>
              <a href="https://www.visa.com.vn/vi_VN">
              <FontAwesomeIcon icon={faCcVisa} />
              </a>
            </li>
            <li>
              <a href="https://www.paypal.com/vn/home">
              <FontAwesomeIcon icon={faCcPaypal} />
              </a>
            </li>
            <li>
              <a href="https://www.mastercard.com.vn/vi-vn.html">
                
          <FontAwesomeIcon icon={faCcMastercard} />
          
              </a>
            </li>
            <li>
              <a href="https://www.discover.com/">
              <FontAwesomeIcon icon={faCcDiscover} />
              
              </a>
            </li>
            <li>
              <a href="https://www.americanexpress.com/">
              <FontAwesomeIcon icon={faCcAmex} />
              </a>
            </li>
          </ul>

          
        </div>
        <span className="final">
          Copyright © 2024 All rights reserved | Design by Group 8
        </span>
      </div>
    </>
  );
}
