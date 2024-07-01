import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import './AdminPages.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Product from './Product/Product';
import Account from './Account/Account';
import UpdateAccount from './Account/UpdateAccount';
import AddAccount from './Account/AddAccount';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddProduct from './Product/AddProduct';
import UpdateProduct from './Product/UpdateProduct';

export default function AdminPages() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const nav = useNavigate();

  const extractIdFromUrl = (url) => {
    const match = url.match(/\/SWP391-MomAndBaby\/admin\/account\/update\/(\d+)/);
    return match ? match[1] : null;
  };
  const extractIdFromUrl2 = (url) => {
    const match = url.match(/\/SWP391-MomAndBaby\/admin\/product\/update\/(\d+)/);
    return match ? match[1] : null;
  };

  const accountId = extractIdFromUrl(currentUrl);
  const productId = extractIdFromUrl2(currentUrl);
  const handleAddAccount = () => {
    nav('/SWP391-MomAndBaby/admin/account/add');
  };
  const handleAddProduct = () => {
    nav('/SWP391-MomAndBaby/admin/product/add')
  }
  return (
    <div className="full-page-wrappers">
      <Header className="header" />
      <Container fluid className="main-content">
        <Row>
          <Col xs={2} className="p-0">
            <SideBar className="Side" style={{width: "100%"}} />
          </Col>
          <Col xs={10} className="sidebarFooterContent">
            {currentUrl === "/SWP391-MomAndBaby/admin/product" && (
              <React.Fragment >
                <Row className="contentCa mb-3">
                  <Col className="d-flex justify-content-center" md={12}>
                    <Button className="AddButton" onClick={handleAddProduct}>Add new</Button>
                  </Col>
                </Row>
                <Row className="SomethingCa">
                  <Col className="PaddingWhite">
                    <Product />
                  </Col>
                </Row>
              </React.Fragment>
            )}
            {currentUrl === "/SWP391-MomAndBaby/admin/account" && (
              <React.Fragment>
                <Row className="contentCa mb-3">
                  <Col className="d-flex justify-content-center">
                    <Button className="AddButton" onClick={handleAddAccount}>Add new</Button>
                  </Col>
                </Row>
                <Row className="SomethingCa">
                  <Col className="PaddingWhite">
                    <Account />
                  </Col>
                </Row>
              </React.Fragment>
            )}
            {currentUrl.startsWith("/SWP391-MomAndBaby/admin/account/update") && accountId && (
              <React.Fragment >
                <Row className="SomethingCa">
                <Col className="PaddingWhite">
                  <UpdateAccount id={accountId} />
                </Col>
              </Row>
              </React.Fragment>
            )}
            {currentUrl === "/SWP391-MomAndBaby/admin/account/add" && (
              <React.Fragment >
                <Row className="SomethingCa">
                <Col className="PaddingWhite">
                  <AddAccount />
                </Col>
              </Row>
              </React.Fragment>
            )}
            {currentUrl === "/SWP391-MomAndBaby/admin/product/add" && (
              <React.Fragment >
                <Row className="SomethingCa">
                <Col className="PaddingWhite">
                  <AddProduct />
                </Col>
              </Row>
              </React.Fragment>
            )}
            {currentUrl.startsWith("/SWP391-MomAndBaby/admin/product/update") && productId &&(
              <React.Fragment >
              <Row className="SomethingCa">
              <Col className="PaddingWhite">
                <UpdateProduct id={productId} />
              </Col>
            </Row>
            </React.Fragment>
            )}
                    <Row style={{marginTop: 9}} className="FootContainer">
              <Col>
                <Footer className="Foot" />
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>
    </div>
  );
}
