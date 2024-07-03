import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function AddProduct() {
  const baseURL = 'https://66801b4556c2c76b495b2d81.mockapi.io/product/';
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    mainImg: '',
    quantity: '',
    model: '', // Assuming 'Milk' as default
    priority: '',
    category: '',
    producer: '',
    brand: '',
  });

  const nav = useNavigate();

  const handleSave = () => {
    const newProductData = { ...productData, sold: 0 }; // Set default value for 'sold' field

    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    })
      .then(response => response.json())
      .then(() => {
        toast.success('Product added successfully', {
          onClose: () => {
            nav('/SWP391-MomAndBaby/admin/product'); // Navigate to the product list page after successful addition
          },
        });
      })
      .catch(error => {
        toast.error(`Failed to add product: ${error.message}`);
      });
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div
          style={{
            backgroundColor: '#ddede0',
            textAlign: 'center',
            padding: '5px 20px',
          }}
        >
          <span style={{ fontSize: 35 }}>ADD PRODUCT</span>
        </div>
        <div>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Product Name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={productData.name}
                onChange={e => setProductData({ ...productData, name: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Price</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="number"
                value={productData.price}
                onChange={e => setProductData({ ...productData, price: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                as="textarea"
                rows={3}
                value={productData.description}
                onChange={e => setProductData({ ...productData, description: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Main Image URL</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={productData.mainImg}
                onChange={e => setProductData({ ...productData, mainImg: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="number"
                value={productData.quantity}
                onChange={e => setProductData({ ...productData, quantity: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Model</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={productData.model}
                onChange={e => setProductData({ ...productData, model: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Priority</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                as="select"
                value={productData.priority}
                onChange={e => setProductData({ ...productData, priority: e.target.value })}
              >
                <option value="">Select Priority</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Control>
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Category</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={productData.category}
                onChange={e => setProductData({ ...productData, category: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Producer</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={productData.producer}
                onChange={e => setProductData({ ...productData, producer: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Brand</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={productData.brand}
                onChange={e => setProductData({ ...productData, brand: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Col md={3}></Col>
            <Col md={9}>
              <Button
                style={{
                  marginLeft: 15,
                  width: '60%',
                  backgroundColor: '#337ab7',
                  color: 'white',
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Col>
          </Row>
          <Row style={{ margin: 20 }}>
            <Link to={'/SWP391-MomAndBaby/admin/product'}>
              <Button style={{ width: '15%', color: 'white' }} variant="info">
                &lt;&lt; Back to Products
              </Button>
            </Link>
          </Row>
        </div>
      </div>
    </>
  );
}
