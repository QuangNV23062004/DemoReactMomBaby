import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import './AdminPages.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Product from './Product/Product';
import Account from './Account/Account';
import UpdateAccount from './Account/UpdateAccount';
import AddAccount from './Account/AddAccount';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddProduct from './Product/AddProduct';
import UpdateProduct from './Product/UpdateProduct';
import NotFound from '../NotFound';
import Voucher from './Voucher/Voucher';
import AddVoucher from './Voucher/AddVoucher';

export default function AdminPages() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const nav = useNavigate();

  const extractIdFromUrl = (url, regex) => {
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const accountId = extractIdFromUrl(currentUrl, /\/SWP391-MomAndBaby\/admin\/account\/update\/(\d+)/);
  const productId = extractIdFromUrl(currentUrl, /\/SWP391-MomAndBaby\/admin\/product\/update\/(\d+)/);

  const handleAddAccount = () => {
    nav('/SWP391-MomAndBaby/admin/account/add');
  };
  const handleAddVoucher = () => {
    nav('/SWP391-MomAndBaby/admin/voucher/add');
  }

  const handleAddProduct = () => {
    nav('/SWP391-MomAndBaby/admin/product/add');
  };

  let content;
  switch (true) {
    case currentUrl === "/SWP391-MomAndBaby/admin/product":
      content = (
        <React.Fragment>
          <Row className="contentCa mb-0">
            <Col className="d-flex justify-content-center" md={12}>
              <Button className="AddButton" onClick={handleAddProduct}>Add new</Button>
            </Col>
          </Row>
          <Row className="SomethingCa content-wrapper">
            <Col className="PaddingWhite">
              <Product />
            </Col>
          </Row>
        </React.Fragment>
      );
      break;

    case currentUrl === "/SWP391-MomAndBaby/admin/account":
      content = (
        <React.Fragment>
          <Row>
          <Col md={2}></Col>
          <Col md={10} style={{width: 1400}}>
          <Row className="contentCa mb-0">
            <Col className="d-flex justify-content-center">   
              <Button className="AddButton" onClick={handleAddAccount}>Add new</Button>
            </Col>
          </Row>
          
          <Row className="SomethingCa content-wrapper">
          <Col className="PaddingWhite">
              <Account />
            </Col>
          </Row></Col>
          </Row>
        </React.Fragment>
      );
      break;

    case currentUrl.startsWith("/SWP391-MomAndBaby/admin/account/update") && accountId:
      content = (
        <React.Fragment>
          <Row className="SomethingCa content-wrapper">
            <Col className="PaddingWhite">
              <UpdateAccount id={accountId} />
            </Col>
          </Row>
        </React.Fragment>
      );
      break;

    case currentUrl === "/SWP391-MomAndBaby/admin/account/add":
      content = (
        <React.Fragment>
          <Row className="SomethingCa content-wrapper">
            <Col className="PaddingWhite">
              <AddAccount />
            </Col>
          </Row>
        </React.Fragment>
      );
      break;

    case currentUrl === "/SWP391-MomAndBaby/admin/product/add":
      content = (
        <React.Fragment>
          <Row className="SomethingCa content-wrapper">
            <Col className="PaddingWhite">
              <AddProduct />
            </Col>
          </Row>
        </React.Fragment>
      );
      break;

    case currentUrl.startsWith("/SWP391-MomAndBaby/admin/product/update") && productId:
      content = (
        <React.Fragment>
          <Row className="SomethingCa content-wrapper">
            <Col className="PaddingWhite">
              <UpdateProduct id={productId} />
            </Col>
          </Row>
        </React.Fragment>
      );
      break;
      case currentUrl === "/SWP391-MomAndBaby/admin/voucher" : 
      content = (
        <React.Fragment>
          <Row>
          <Col md={2}></Col>
          <Col md={10} style={{width: 1400}}>
          <Row className="contentCa mb-0">
            <Col className="d-flex justify-content-center">   
              <Button className="AddButton" onClick={handleAddVoucher}>Add new</Button>
            </Col>
          </Row>
          
          <Row className="SomethingCa content-wrapper">
          <Col className="PaddingWhite">
              <Voucher />
            </Col>
          </Row></Col>
          </Row>
        </React.Fragment>
      );
      break;
      case currentUrl === "/SWP391-MomAndBaby/admin/voucher/add": 
      content = (
        <React.Fragment>
          <Row className="SomethingCa content-wrapper">
            <Col className="PaddingWhite">
              <AddVoucher/>
            </Col>
          </Row>
        </React.Fragment>
      );
      break;
    default:
      content = <NotFound />;
  }

  return (
    <div className="full-page-wrappers">
      <Header className="header" />
      <Container fluid className="main-content">
        <Row style={{width: "100%"}}>
          <Col xs={2} className="p-0">
            <SideBar className="Side" style={{ width: "100%", display: "block" }} />
          </Col>
          <Col xs={10} className="sidebarFooterContent">
            <div className='maxcontent'><Row>{content}</Row>
            <Row className="footer-row">
              <Col>
                <Footer className="Foot" />
              </Col>
            </Row></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
