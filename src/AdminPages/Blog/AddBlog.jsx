import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = ({ show, handleClose, handleAddBlog }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: '',
            shortDesc: '',
            image: null,
            desc: '',
            status: '1',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            shortDesc: Yup.string().required('Short Description is required'),
            image: Yup.mixed().required('Image is required'),
            desc: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });
            try {
                await axios.post('https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog', formData);
                handleAddBlog();
                resetForm();
                setLoading(false);
                handleClose();
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
                <Form onSubmit={formik.handleSubmit} style={{ padding: '0 15px' }}>
                    <Form.Group controlId="title" style={{ marginBottom: '20px' }}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            as='textarea'
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            isInvalid={!!formik.errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="shortDesc" style={{ marginBottom: '20px' }}>
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
                    <Form.Group controlId="image" style={{ marginBottom: '20px' }}>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={(event) => {
                                formik.setFieldValue('image', event.currentTarget.files[0]);
                            }}
                            isInvalid={!!formik.errors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="desc" style={{ marginBottom: '50px' }}>
                        <Form.Label>Description</Form.Label>
                        <ReactQuill
                            value={formik.values.desc}
                            onChange={(value) => formik.setFieldValue('desc', value)}
                            style={{ height: '150px', marginBottom: '10px' }}
                        />
                        {formik.errors.desc ? (
                            <div className="invalid-feedback d-block">
                                {formik.errors.desc}
                            </div>
                        ) : null}
                    </Form.Group>
                    <Form.Group controlId="status" style={{ marginBottom: '20px' }}>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            onChange={formik.handleChange}
                            value={formik.values.status}
                        >
                            <option value="1">Active</option>
                            <option value="0">Hidden</option>
                        </Form.Control>
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="secondary" onClick={handleClose} disabled={loading}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Add'
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddBlog;
