import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = ({ show, handleClose, handleAddBlog }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product/";

    const fetchApi = () => {
        fetch(baseURL)
            .then((response) => response.json())
            .then((data) => {
                // Add a 'selected' property to each item for checkbox control
                const updatedData = data.map((item) => ({ ...item, selected: false }));
                setData(updatedData);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
            shortDesc: '',
            image: '',
            detailBlog: '',
            productID: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            shortDesc: Yup.string().required('Short Description is required'),
            image: Yup.string().required('Image is required'),
            detailBlog: Yup.string().required('Detailed Blog is required'),
            productID: Yup.string().required('Product ID is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const response = await axios.post('https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog', values);
                handleAddBlog(response.data); // Notify parent component of successful blog addition
                resetForm(); // Clear form fields after successful submission
                setLoading(false);
                handleClose(); // Close modal after successful submission
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        },
    });

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            isInvalid={!!formik.errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="shortDesc">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="shortDesc"
                            rows={3}
                            onChange={formik.handleChange}
                            value={formik.values.shortDesc}
                            isInvalid={!!formik.errors.shortDesc}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.shortDesc}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            onChange={formik.handleChange}
                            value={formik.values.image}
                            isInvalid={!!formik.errors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="detailBlog">
                        <Form.Label>Detailed Blog</Form.Label>
                        <ReactQuill
                            value={formik.values.detailBlog}
                            onChange={(value) => formik.setFieldValue('detailBlog', value)}
                        />
                        {formik.errors.detailBlog && (
                            <div className="invalid-feedback d-block">
                                {formik.errors.detailBlog}
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group controlId="productID">
                        <Form.Label>Product ID</Form.Label>
                        <Form.Select
                            name="productID"
                            onChange={formik.handleChange}
                            value={formik.values.productID}
                            isInvalid={!!formik.errors.productID}
                        >
                            <option value="">Select a Product</option>
                            {data.map((product) => (
                                <option key={product.id} value={product.id}>
                                    <div>
                                        {product.name}
                                    </div>
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.productID}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Add'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddBlog;
