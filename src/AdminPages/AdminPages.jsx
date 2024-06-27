import React from 'react';
import './AdminPages.css';
import SideBar from './Components/SideBar/SideBar';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './Category/Category';
import { useLocation } from 'react-router-dom';
import Product from './Product/Product';
import Producer from './Producer/Producer';
import Account from './Account/Account';
import Brand from './Brand/Brand';

export default function AdminPages() {
  const location = useLocation();
  const currentUrl = location.pathname;
  return (
    <div className='full-page-wrappers'>
      <Header />
      <div className='main-content'>
        <SideBar className="Side" />
        <div className='sidebarFooterContent'>
          <div className='contentCa'>
            <button className='AddButton'>Add new</button>
          </div>
          <div className='SomethingCa'>
            <div className='PaddingWhite'>
              {currentUrl === "/SWP391-MomAndBaby/admin/category" ? <Category/> : <></> }
              {currentUrl === "/SWP391-MomAndBaby/admin/product" ? <Product/> : <></> }
              {currentUrl === "/SWP391-MomAndBaby/admin/producer" ? <Producer/> : <></> }
              {currentUrl === "/SWP391-MomAndBaby/admin/account" ? <Account/> : <></> }
              {currentUrl === "/SWP391-MomAndBaby/admin/brand" ? <Brand/> : <></> }
              
            </div>
          </div>
          <div className='FootContainer'>
            <Footer className="Foot" />
          </div>
        </div>
      </div>
    </div>
  );
}
