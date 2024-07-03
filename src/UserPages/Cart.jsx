import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const userId = sessionStorage.getItem('userId');
  const baseURLCart = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const baseURLProduct = "https://66801b4556c2c76b495b2d81.mockapi.io/product/";
  const baseURLPreorder = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Preorder/";
  const [dataCart, setDataCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataPreorder, setDataPreorder] = useState([]);

  const fetchCartData = () => {
    fetch(baseURLCart)
      .then((response) => response.json())
      .then((data) => {
        const userCartItems = data.filter(item => item.userID === userId);
        setDataCart(userCartItems);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchPreorderData = () => {
    fetch(baseURLPreorder)
      .then((response) => response.json())
      .then((data) => {
        const userPreorderItems = data.filter(item => item.userID === userId);
        setDataPreorder(userPreorderItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProductData = async (productId) => {
    const response = await fetch(`${baseURLProduct}${productId}`);
    return response.json();
  };

  const updatePreorderStatus = async () => {
    const updatedPreorder = await Promise.all(dataPreorder.map(async (item) => {
      const productData = await fetchProductData(item.productID);
      return {
        ...item,
        quantity: productData.quantity,
        status: productData.quantity > 0 ? 'Available' : 'Out of stock'
      };
    }));
    setDataPreorder(updatedPreorder);
    setLoading(false);
  };

  useEffect(() => {
    fetchCartData();
    fetchPreorderData();
  }, [userId]);

  useEffect(() => {
    if (dataPreorder.length > 0) {
      updatePreorderStatus();
    }
  }, [dataPreorder]);

  const handleRemoveFromCart = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${baseURLCart}?userID=${userId}`);
      const cartItems = await response.json();
      const itemToRemove = cartItems.find(item => item.userID === userId && item.productID === productId);

      if (itemToRemove) {
        await fetch(`${baseURLCart}/${itemToRemove.id}`, {
          method: 'DELETE'
        });

        const updatedCartItems = dataCart.filter(item => item.id !== itemToRemove.id);
        setDataCart(updatedCartItems);

        const productResponse = await fetch(`${baseURLProduct}${productId}`);
        const productData = await productResponse.json();
        const updatedProduct = {
          ...productData,
          quantity: productData.quantity + itemToRemove.quantity
        };

        await fetch(`${baseURLProduct}${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        });

        toast.success('Item removed from cart successfully!');
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleRemoveFromPreorder = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to remove this item from your preorder?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${baseURLPreorder}?userID=${userId}`);
      const preorders = await response.json();
      const itemToRemove = preorders.find(item => item.userID === userId && item.productID === productId);

      if (itemToRemove) {
        await fetch(`${baseURLPreorder}/${itemToRemove.id}`, {
          method: 'DELETE'
        });

        // Directly update the state without another fetch
        const updatedPreorders = dataPreorder.filter(item => item.id !== itemToRemove.id);
        setDataPreorder(updatedPreorders);

        toast.success('Item removed from preorder successfully!');
      }
    } catch (error) {
      console.error("Error removing item from preorder:", error);
      toast.error('Failed to remove item from preorder.');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ToastContainer />
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
                    <th style={{ textAlign: 'center' }}></th>
                    <th style={{ textAlign: 'center' }}>#</th>
                    <th style={{ textAlign: 'center' }}>Product Name</th>
                    <th style={{ textAlign: 'center' }}>Product Image</th>
                    <th style={{ textAlign: 'center' }}>Quantity</th>
                    <th style={{ textAlign: 'center' }}>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCart.map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>
                        <Button variant='outline-danger' onClick={() => handleRemoveFromCart(item.productID)}>
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                      </td>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ textAlign: 'center' }}>{item.productName}</td>
                      <td style={{ textAlign: 'center' }}><img src={item.productImage} alt={item.productName} style={{ width: '100px' }} /></td>
                      <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ textAlign: 'center' }}>{item.totalPrice} VNĐ</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Preorder Cart</h1>
            {loading ? (
              <p>Loading...</p>
            ) : dataPreorder.length === 0 ? (
              <p>Your preorder is currently empty.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th style={{ textAlign: 'center' }}>#</th>
                    <th style={{ textAlign: 'center' }}>Product Name</th>
                    <th style={{ textAlign: 'center' }}>Product Image</th>
                    <th style={{ textAlign: 'center' }}>Product Price</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPreorder.map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>
                        <Button variant='outline-danger' onClick={() => handleRemoveFromPreorder(item.productID)}>
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                      </td>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ textAlign: 'center' }}>{item.productName}</td>
                      <td style={{ textAlign: 'center' }}><img src={item.productImage} alt={item.productName} style={{ width: '100px' }} /></td>
                      <td style={{ textAlign: 'center' }}>{item.price} VNĐ</td>
                      <td style={{ textAlign: 'center' }}>
                        {item.status === "Available" ? (
                          <span style={{ backgroundColor: "#3FFF00", color: 'white', padding: "5px 10px", borderRadius: 5, border: "2px solid #ACE1AF" }}>
                            <b>{item.status}</b>
                          </span>
                        ) : (
                          <span style={{ backgroundColor: "#EF0107", color: 'white', padding: "5px 10px", borderRadius: 5, border: "2px solid #FF0800" }}>
                            <b>{item.status}</b>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
        <Button as={Link} to="/SWP391-MomAndBaby/product" variant="primary">Continue Shopping</Button>
      </Container>
      <Footer />
    </>
  );
}
