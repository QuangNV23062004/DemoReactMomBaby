

import React from 'react'
import './Category.css'
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
          <div className='contentCa'>
            
              <button className='AddButton'>Add new</button>
          
          </div>
          <div className='SomethingCa'>
            <div className='Outline'>
              <div></div>
            </div>
          </div>
          <div className='FootContainer'>
          <Footer className="Foot" />
          </div>
        </div>
      </div>
    </div>
  )
}
