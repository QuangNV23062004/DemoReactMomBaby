import React from 'react'
import './Home.css'
import SideBar from '../Components/SideBar/SideBar'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'

export default function Home() {
  return (
    <div className='full-page-wrappers'>
      <Header />
      <div className='main-content'>
        <SideBar className="Side"></SideBar>
        <div className='sidebarFooterContent'>
          <div className='content'>
            <div id='RedCate'  className='BoxForStuff'>
            <i class="bx bx-category-alt"></i>
              <span>Category</span>
            </div>
            <div id='BlackProducer'  className='BoxForStuff'>
            <i class="bx bx-buildings"></i>
              <span>Producer</span>
            </div>
            <div id='GreenProd' className='BoxForStuff' >
            <i class="bx bx-package"></i>
              <span>Product</span>
            </div>
            <div id='BlueAcc' className='BoxForStuff'>
            <i class="bx bx-user"></i>
              <span>Account</span>
            </div>
          </div>
          <div className='Something'></div>
          <div className='FootContainer'>
          <Footer className="Foot" />
          </div>
        </div>
      </div>
    </div>
  )
}
