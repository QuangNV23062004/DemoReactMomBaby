import React from 'react'
import './Home.css'
import SideBar from '../Components/SideBar/SideBar'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Dashboard from '../Dashboard/Dashboard'
import {Col,Row,Container} from 'react-bootstrap'
export default function Home() {
  return (
    <div className="full-page-wrappers">
      <Header className="header" />
      <Container fluid className="main-content">
        <Row style={{ width: "100%" }}>
          <Col xs={2} className="p-0">
            <SideBar className="Side" style={{ width: "100%", display: "block" }} />
          </Col>
          <Col xs={10} className="sidebarFooterContent">
          <div className='sidebarFooterContent'>
          <div className='content'>
            <div id='RedCate'  className='BoxForStuff'>
            <i className="bx bx-category-alt"></i>
              <span>Voucher</span>
            </div>
            <div id='BlackProducer'  className='BoxForStuff'>
            <i className="bx bx-buildings"></i>
              <span>Bill</span>
            </div>
            <div id='GreenProd' className='BoxForStuff' >
            <i className="bx bx-package"></i>
              <span>Product</span>
            </div>
            <div id='BlueAcc' className='BoxForStuff'>
            <i className="bx bx-user"></i>
              <span>Account</span>
            </div>
          </div>
          <div className='Something'><Dashboard></Dashboard>
          </div>
          
          
          
          <Footer className="Foot" />
          
        </div>
        </Col>
      </Row>
      </Container>
    </div>
  )
}
