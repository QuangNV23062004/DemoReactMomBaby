import React from 'react';
import './AdminPages.css';
import SideBar from './Components/SideBar/SideBar';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Product from './Product/Product';
import Account from './Account/Account';
import UpdateAccount from './Account/UpdateAccount';
import AddAccount from './Account/AddAccount';

export default function AdminPages() {
  const location = useLocation();
  const currentUrl = location.pathname;
const nav = useNavigate();
  const extractIdFromUrl = (url) => {
    const match = url.match(/\/SWP391-MomAndBaby\/admin\/account\/update\/(\d+)/);
    return match ? match[1] : null;
  };

  const accountId = extractIdFromUrl(currentUrl);
  const handleAddAccount =() =>{
    nav('/SWP391-MomAndBaby/admin/account/add');
  }
  return (
    <div className='full-page-wrappers'>
      <Header />
      <div className='main-content'>
        <SideBar className="Side" />
        <div className='sidebarFooterContent'>
          {currentUrl === "/SWP391-MomAndBaby/admin/product" && (
            <>
              <div className='contentCa'>
                <button className='AddButton'>Add new</button>
              </div>
              <div className='SomethingCa'>
                <div className='PaddingWhite'>
                  <Product />
                </div>
              </div>
            </>
          )}
          {currentUrl === "/SWP391-MomAndBaby/admin/account" && (
            <>
              <div className='contentCa'>
                <button className='AddButton' onClick={()=> handleAddAccount()}>Add new</button>
              </div>
              <div className='SomethingCa'>
                <div className='PaddingWhite'>
                  <Account />
                </div>
              </div>
            </>
          )}
          {currentUrl.startsWith("/SWP391-MomAndBaby/admin/account/update") && accountId && (
            <>
              
              <div className='SomethingCa'>
                <div className='PaddingWhite'>
                  <UpdateAccount id={accountId} />
                </div>
              </div>
            </>
          )}
          {currentUrl==="/SWP391-MomAndBaby/admin/account/add" &&(
            <>
              
              <div className='SomethingCa'>
                <div className='PaddingWhite'>
                  <AddAccount></AddAccount>
                </div>
              </div>
            </>
          )} 
          <div className='FootContainer'>
            <Footer className="Foot" />
          </div>
        </div>
      </div>
    </div>
  );
}
