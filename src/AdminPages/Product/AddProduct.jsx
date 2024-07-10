import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct() {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.number().positive('Price must be a positive number').required('Price is required'),
    description: Yup.string().required('Description is required'),
    mainImg: Yup.string().required('Main Image URL is required'),
    quantity: Yup.number().positive('Quantity must be a positive number').required('Quantity is required'),
    model: Yup.string().required('Model is required'),
    priority: Yup.number().positive('Priority must be a positive number').required('Priority is required'),
    category: Yup.string().required('Category is required'),
    producer: Yup.string().required('Producer is required'),
    brand: Yup.string().required('Brand is required')
  });

  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
      mainImg: '',
      quantity: '',
      model: '',
      priority: '',
      category: '',
      producer: '',
      brand: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://66801b4556c2c76b495b2d81.mockapi.io/product/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Product added successfully:', data);
          formik.resetForm();
          toast.success('Product added successfully', {
            onClose: () => nav('/SWP391-MomAndBaby/admin/product')
          });
        } else {
          throw new Error('Failed to add product');
        }
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error(`Failed to add product: ${error.message}`);
      }
    }
  });

  return (
    <div>
      <h2>Add New Product</h2>
      <ToastContainer />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Row>
            <Col md={3}>
              <Form.Label>Product Name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.name && formik.touched.name}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Row>
            <Col md={3}>
              <Form.Label>Price</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.price && formik.touched.price}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.price}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Row>
            <Col md={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.description && formik.touched.description}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="mainImg">
          <Row>
            <Col md={3}>
              <Form.Label>Main Image URL</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter main image URL"
                name="mainImg"
                value={formik.values.mainImg}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.mainImg && formik.touched.mainImg}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.mainImg}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Row>
            <Col md={3}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.quantity && formik.touched.quantity}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.quantity}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="model">
          <Row>
            <Col md={3}>
              <Form.Label>Model</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter model"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.model && formik.touched.model}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.model}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="priority">
          <Row>
            <Col md={3}>
              <Form.Label>Priority</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="number"
                placeholder="Enter priority"
                name="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.priority && formik.touched.priority}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.priority}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Row>
            <Col md={3}>
              <Form.Label>Category</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.category && formik.touched.category}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.category}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="producer">
          <Row>
            <Col md={3}>
              <Form.Label>Producer</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter producer"
                name="producer"
                value={formik.values.producer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.producer && formik.touched.producer}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.producer}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="brand">
          <Row>
            <Col md={3}>
              <Form.Label>Brand</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.brand && formik.touched.brand}
                style={{ width: '60%' }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.brand}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
}
