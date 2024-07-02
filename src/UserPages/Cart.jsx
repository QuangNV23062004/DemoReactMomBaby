import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function Cart() {
  const userId = sessionStorage.getItem('userId');
  const baseURLCart = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const [dataCart, setDataCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = () => {
    fetch(baseURLCart)
      .then((response) => response.json())
      .then((data) => {
        // Filter cart items for the logged-in user only
        const userCartItems = data.filter(item => item.userID === userId);
        setDataCart(userCartItems);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApi();
  }, [userId]);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1>Shopping Cart</h1>
            {loading ? (
              <p>Loading...</p>
            ) : dataCart.length === 0 ? (
              <p>Your cart is currently empty.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.productName}</td>
                      <td><img src={item.productImage} alt={item.ProductName} style={{ width: '100px' }} /></td>
                      <td>{item.quantity}</td>
                      <td>{item.totalPrice} VNĐ</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Button as={Link} to="/SWP391-MomAndBaby/product" variant="primary">Continue Shopping</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
