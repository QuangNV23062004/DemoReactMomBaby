// AboutPage.jsx
import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EuroIcon from '@mui/icons-material/Euro';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ShieldIcon from '@mui/icons-material/Shield';
import AboutMilk from '../assets/AboutMilk.jpg'

const stats = [
  { icon: HomeIcon, count: '10.5K', text: 'Seller active our site' },
  { icon: AttachMoneyIcon, count: '33K', text: 'Revenue generated' },
  { icon: ShoppingCartIcon, count: '45.5K', text: 'Products sold' },
  { icon: EuroIcon, count: '25K', text: 'European customers' },
];

const features = [
  { icon: LocalShippingIcon, title: 'FREE AND FAST DELIVERY', text: 'Free delivery for all orders over $140' },
  { icon: HeadsetMicIcon, title: '24/7 CUSTOMER SERVICE', text: 'Friendly 24/7 customer support' },
  { icon: ShieldIcon, title: 'MONEY BACK GUARANTEE', text: 'We return money within 30 days' },
];

const AboutPage = () => {
  return (
    <div>
      <Header />
      <div id="breadcrumb" className="section">
        <div className="container">
          <div className="row" style={{ background: 'transparent' }}>
            <div className="col-md-12">
              <ul className="breadcrumb-tree" style={{ listStyleType: 'none', display: 'flex', padding: 0, alignItems: 'center' }}>
                <li style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                  <Link to="/SWP391-MomAndBaby" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Home</Link>
                  <span style={{ marginLeft: '10px', marginRight: '10px', color: '#6c757d' }}>/</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <Link to="/SWP391-MomAndBaby/about" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>About</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row" style={{ marginBottom: '60px', backgroundColor: '#c4d9fb' }}>
            <div className="col-md-6">
              <div style={{ marginTop: '40px' }}>
                <h1 style={{ fontSize: '40px' }}>About us</h1>
                <p style={{ fontSize: '30px' }}>Our Journey</p>
                <p>
                  Welcome to Mom&Babies, where nurturing motherhood meets innovation.
                  Born from a passion to support mothers and their little ones,
                  we’ve dedicated ourselves to provide the finest milk products that cater to the nutritional needs of both mom and baby.
                </p>
                <p style={{ fontSize: '30px' }}>Our Philosophy</p>
                <p>
                  We believe that every mother deserves the best and that’s why our products are designed
                  to enhance the precious bond between you and your child.
                  Our commitment to quality ensures that you receive nothing but the purest,
                  most nourishing milk enriched with essential vitamins and minerals.
                </p>
                <p style={{ fontSize: '30px' }}>Our Promise</p>
                <p>
                  At Mom&Babies, we’re more than just a brand;
                  we’re a community of parents who understand the journey of parenthood.
                  Our promise is to be there with you,
                  providing support and exceptional products that contribute to your family’s well-being.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img src={AboutMilk} alt="About" width="100%" style={{ borderRadius: '10px' , marginTop:'100px'}} />
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row" style={{ backgroundColor: '#c4d9fb' }}>
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3">
                <div className="order-summary text-center" style={{ border: '1px solid black', padding: '15px', margin: '20px', borderRadius: '10px', backgroundColor: '#607DAD' }}>
                  <div className="product-btns" style={{ marginBottom: '20px' }}>
                    <button className="btn-round" style={{ backgroundColor: 'black', borderRadius: '50%', width: '45px', height: '45px' }}>
                      <stat.icon style={{ color: 'white', fontSize: '24px' }} />
                    </button>
                  </div>
                  <h2>{stat.count}</h2>
                  <p>{stat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section" style={{ marginBottom: '40px' }}>
        <div className="container">
          <div className="row" style={{ backgroundColor: '#c4d9fb' }}>
            {features.map((feature, index) => (
              <div key={index} className="col-md-4 text-center">
                <div className="product-btns" style={{ marginBottom: '20px' }}>
                  <button className="btn-fa" style={{ borderRadius: '50%', width: '50px', height: '50px' }}>
                    <feature.icon style={{ fontSize: '32px' }} />
                  </button>
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
