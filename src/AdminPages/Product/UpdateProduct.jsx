import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProduct({id}) {
  const baseURL = 'https://66801b4556c2c76b495b2d81.mockapi.io/product/';
  
  const [data, setData] = useState({});
  const nav = useNavigate();

  // Fetch initial data based on id
  useEffect(() => {
    if (id) {
      fetch(baseURL + id)
        .then(response => response.json())
        .then(data => {
          setData(data);
          console.log(id);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  // Function to handle form submission and update API
  const handleSave = () => {
    fetch(baseURL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        toast.success(`Update ${id} successful`, {
          onClose: () => {
            nav('/SWP391-MomAndBaby/admin/product');
          },
        });
      })
      .catch(error => {
        toast.error(`Update ${id} failed: ${error.message}`);
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
          <span style={{ fontSize: 35 }}>UPDATE PRODUCT</span>
        </div>
        <div>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>ID</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.id || ''}
                readOnly
                disabled
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.name || ''}
                onChange={e => setData({ ...data, name: e.target.value })}
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
                value={data.price || ''}
                onChange={e => setData({ ...data, price: e.target.value })}
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
                value={data.description || ''}
                onChange={e => setData({ ...data, description: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Main Image</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.mainImg || ''}
                onChange={e => setData({ ...data, mainImg: e.target.value })}
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
                value={data.quantity || ''}
                onChange={e => setData({ ...data, quantity: e.target.value })}
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
                value={data.model || ''}
                onChange={e => setData({ ...data, model: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Priority</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Select
                aria-label="Default select example"
                value={data.priority || ''}
                onChange={e => setData({ ...data, priority: e.target.value })}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Select>
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Category</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.category || ''}
                onChange={e => setData({ ...data, category: e.target.value })}
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
                value={data.producer || ''}
                onChange={e => setData({ ...data, producer: e.target.value })}
                
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
                value={data.brand || ''}
                onChange={e => setData({ ...data, brand: e.target.value })}
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
            <Link to="/SWP391-MomAndBaby/admin/product">
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
