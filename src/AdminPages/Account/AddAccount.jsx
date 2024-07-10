import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddAccount() {
  const baseURL = 'https://66801b4556c2c76b495b2d81.mockapi.io/Account/';
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      role: '', // Initialize with an empty role for user selection
      avatar: '',
      point: 0, // Initialize point with a default value of 0
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, 'Fullname must be at least 5 characters')
        .required('Fullname is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone is required'),
      username: Yup.string()
        .min(5, 'Username must be at least 5 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      role: Yup.string()
        .required('Role is required'),
      avatar: Yup.string()
        .required('Avatar URL is required'),
    }),
    onSubmit: (values) => {
      fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(() => {
          toast.success('Account created successfully', {
            onClose: () => {
              navigate('/SWP391-MomAndBaby/admin/account');
            },
          });
        })
        .catch(error => {
          toast.error(`Failed to create account: ${error.message}`);
        });
    },
  });

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
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Full name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="error">{formik.errors.fullname}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Email address</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Phone number</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Username</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Role</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
              {formik.touched.role && formik.errors.role ? (
                <div className="error">{formik.errors.role}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Avatar</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                name="avatar"
                value={formik.values.avatar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.avatar && formik.errors.avatar ? (
                <div className="error">{formik.errors.avatar}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Col md={3}></Col>
            <Col md={9}>
              <Button
                type="submit"
                style={{
                  marginLeft: 15,
                  width: '60%',
                  backgroundColor: '#337ab7',
                  color: 'white',
                }}
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
        </Form>
      </div>
    </>
  );
}
