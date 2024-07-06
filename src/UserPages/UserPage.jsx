import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Carouseler from './Carouseler';
import { Container } from 'react-bootstrap';
import Home from './Home';
import { useLocation } from 'react-router-dom';
import ProductPage from './ProductPage';
import NotFound from '../NotFound';
import DetailProduct from './DetailProduct';
import CheckOut from './CheckOut';
import History from './History';
import PersonalPage from './PersonalPage';

export default function UserPage() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const extractIdFromUrl = (url, regex) => {
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const productID = extractIdFromUrl(currentUrl, /\/SWP391-MomAndBaby\/product\/detail\/(\d+)/);
  let content;
  switch (currentUrl) {
    case "/SWP391-MomAndBaby":
    case "/SWP391-MomAndBaby/":
      content = <Home />;
      break;
    case "/SWP391-MomAndBaby/product":
      content = <ProductPage />;
      break;
    case "/SWP391-MomAndBaby/about":
      content = <AboutPage />;
      break;
    case "/SWP391-MomAndBaby/contact":
      content = <ContactPage />;
      break;
    case "/SWP391-MomAndBaby/checkout":
      content = <CheckOut />;
      break;
    case "/SWP391-MomAndBaby/history":
      content = <History />
      break;
    case "/SWP391-MomAndBaby/personal":
      content = <PersonalPage />;
      break;
    default:
      if (currentUrl.startsWith("/SWP391-MomAndBaby/product/detail/")) {
        content = <DetailProduct id={productID} />
      }
      else {
        content = <NotFound />;
      }
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
