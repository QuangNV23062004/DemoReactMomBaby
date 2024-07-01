import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Carouseler from './Carouseler';
import { Container } from 'react-bootstrap';
import Home from './Home';
import { useLocation } from 'react-router-dom';
import ProductPage from './ProductPage';
import NotFound from '../NotFound';

export default function UserPage() {
  const location = useLocation();
  const currentUrl = location.pathname;

  let content;
  switch (currentUrl) {
    case "/SWP391-MomAndBaby":
    case "/SWP391-MomAndBaby/":
      content = <Home />;
      break;
    case "/SWP391-MomAndBaby/product":
      content = <ProductPage />;
      break;
    default:
      content = <NotFound />;
  }

  return (
    <React.Fragment>
      <Header />
      <br />
      <Container>
        {content}
      </Container>
      <br />
      <Footer />
    </React.Fragment>
  );
}
