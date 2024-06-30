import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function AddAccount() {
  const baseURL = 'https://66801b4556c2c76b495b2d81.mockapi.io/Account/';
  const [data, setData] = useState({
    fullname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: '', // Initialize with an empty role for user selection
    avatar: '',
  });

  const nav = useNavigate();

  const handleSave = () => {
    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        toast.success('Account created successfully', {
          onClose: () => {
            nav('/SWP391-MomAndBaby/admin/account');
          },
        });
      })
      .catch(error => {
        toast.error(`Failed to create account: ${error.message}`);
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
          <span style={{ fontSize: 35 }}>ADD ACCOUNT</span>
        </div>
        <div>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Full name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.fullname}
                onChange={e => setData({ ...data, fullname: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Email address</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="email"
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Phone number</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.phone}
                onChange={e => setData({ ...data, phone: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Username</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.username}
                onChange={e => setData({ ...data, username: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="password"
                value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Role</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Select
                aria-label="Default select example"
                value={data.role}
                onChange={e => setData({ ...data, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Avatar</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.avatar}
                onChange={e => setData({ ...data, avatar: e.target.value })}
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
            <Link to={'/SWP391-MomAndBaby/admin/account'}>
              <Button style={{ width: '15%', color: 'white' }} variant="info">
                &lt;&lt; Back to account
              </Button>
            </Link>
          </Row>
        </div>
      </div>
    </>
  );
}
