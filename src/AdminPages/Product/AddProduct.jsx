import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddProduct() {
  const baseURL = 'https://66801b4556c2c76b495b2d81.mockapi.io/product/';
  const nav = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(5, 'Name must be at least 5 characters').required('Name is required'),
    price: Yup.number().min(0, 'Price must be greater than or equal to 0').required('Price is required'),
    quantity: Yup.number().min(0, 'Quantity must be greater than or equal to 0').required('Quantity is required'),
    description: Yup.string().required('Description is required'),
    mainImg: Yup.string().required('Main Image URL is required'),
    model: Yup.string().required('Model is required'),
    priority: Yup.string().required('Priority is required'),
    category: Yup.string().required('Category is required'),
    producer: Yup.string().required('Producer is required'),
    brand: Yup.string().required('Brand is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      quantity: '',
      description: '',
      mainImg: '',
      model: '',
      priority: '',
      category: '',
      producer: '',
      brand: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newProductData = { ...values, sold: 0 };

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
              nav('/SWP391-MomAndBaby/admin/product');
            },
          });
        })
        .catch(error => {
          toast.error(`Failed to add product: ${error.message}`);
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
          <span style={{ fontSize: 35 }}>ADD PRODUCT</span>
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Product Name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Price</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error">{formik.errors.price}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col md={9} style={{paddingLeft: 60}}>
              <Form.Control style={{width: "64%"}}
                as="textarea"
                rows={3}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="error">{formik.errors.description}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Main Image URL</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="mainImg"
                value={formik.values.mainImg}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mainImg && formik.errors.mainImg ? (
                <div className="error">{formik.errors.mainImg}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="error">{formik.errors.quantity}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Model</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.model && formik.errors.model ? (
                <div className="error">{formik.errors.model}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Priority</Form.Label>
            </Col>
            <Col md={9} style={{paddingLeft: 60}}>
              <Form.Select style={{width: "64%"}}
                aria-label="Default select example"
                name="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Priority</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Select>
              {formik.touched.priority && formik.errors.priority ? (
                <div className="error">{formik.errors.priority}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Category</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="error">{formik.errors.category}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Producer</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="producer"
                value={formik.values.producer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.producer && formik.errors.producer ? (
                <div className="error">{formik.errors.producer}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: '10px 20px' }}>
            <Col md={3}>
              <Form.Label>Brand</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.brand && formik.errors.brand ? (
                <div className="error">{formik.errors.brand}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Col md={3}></Col>
            <Col md={9} style={{paddingLeft: 60}}>
              <Button
                style={{
                  marginLeft: 15,
                  width: '60%',
                  backgroundColor: '#337ab7',
                  color: 'white',
                }}
                type="submit"
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
        </Form>
      </div>
    </>
  );
}
