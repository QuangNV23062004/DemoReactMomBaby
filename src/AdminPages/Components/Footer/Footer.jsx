import React from 'react';
import { Col } from 'react-bootstrap';

const footerStyle = {
  backgroundColor: '#c1e3e1',
  color: 'white',
  textAlign: 'center',
  padding: '30px',
  fontSize: '110%',
  width: '100%',
  display: 'block',
};

const linkFooterStyle = {
  textDecoration: 'none',
  color: '#744e7d',
};

const positionStyle = {
  display: 'inline-block',
};

export default function Footer() {
  return (
    <Col md={12} style={positionStyle}>
      <div style={footerStyle}>
        <span>© 2024 | Design by <a href="#" style={linkFooterStyle}>Group 8</a></span>
      </div>
    </Col>
  );
}
