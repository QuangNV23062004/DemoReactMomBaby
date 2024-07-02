import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useCart } from './CartContext'; // Import useCart
import { Link } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function Cart() {
  const { cart } = useCart(); // Get cart from useCart

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
              <p>Your cart is currently empty.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.price} VNĐ</td>
                      <td><img src={product.mainImg} alt={product.name} style={{ width: '100px' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Button as={Link} to="/SWP391-MomAndBaby" variant="primary">Continue Shopping</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
