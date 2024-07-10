import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UpdateBlog = ({ show, handleClose, blog, handleUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [initialValues, setInitialValues] = useState({
        title: '',
        shortDesc: '',
        image: '',
        detailBlog: '',
        productID: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://66801b4556c2c76b495b2d81.mockapi.io/product/');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load products');
            }
        };

        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog/${blog.id}`);
                setInitialValues(response.data);
            } catch (err) {
                setError('Failed to load blog data');
            }
        };

        if (blog && blog.id) {
            fetchBlogData();
        }

        fetchProducts();
    }, [blog]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            shortDesc: Yup.string().required('Short Description is required'),
            image: Yup.string().required('Image is required'),
            detailBlog: Yup.string().required('Detailed Blog is required'),
            productID: Yup.string().required('Product ID is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await handleUpdate({ ...blog, ...values });
                setLoading(false);
                handleClose();
            } catch (err) {
                setError('Failed to update blog');
                setLoading(false);
            }
        },
    });

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
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
                            rows={3}
                            name="shortDesc"
                            value={formik.values.shortDesc}
                            onChange={formik.handleChange}
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
                            value={formik.values.image}
                            onChange={formik.handleChange}
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
                        {formik.errors.detailBlog ? (
                            <div className="text-danger">{formik.errors.detailBlog}</div>
                        ) : null}
                    </Form.Group>
                    <Form.Group controlId="productID">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Select
                            name="productID"
                            onChange={formik.handleChange}
                            value={formik.values.productID}
                            isInvalid={!!formik.errors.productID}
                        >
                            <option value="">Select a Product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.productID}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateBlog;
