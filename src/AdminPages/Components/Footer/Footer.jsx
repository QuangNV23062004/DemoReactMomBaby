import React from 'react';
import { Container, Col } from 'react-bootstrap';

const footerStyle = {
  backgroundColor: '#c1e3e1',
  color: 'white',
  textAlign: 'center',
  padding: '30px',
  fontSize: '110%',
  width: '100%', /* Ensure the footer covers the full width */
};

const linkFooterStyle = {
  textDecoration: 'none',
  color: '#744e7d',
};

const positionStyle = {
  display: 'inline-block',
  width: '100%', /* Ensure the footer covers the full width */
};

export default function Footer() {
  return (
    <Col md={12} style={positionStyle}>
      <div style={footerStyle}>
        <Container> {/* Use Container from react-bootstrap to control width */}
          <span>© 2024 | Design by <a href="#" style={linkFooterStyle}>Group 8</a></span>
        </Container>
      </div>
    </Col>
  );
}
