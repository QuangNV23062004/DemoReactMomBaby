import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateBlog = ({ show, handleClose, blog, handleUpdate }) => {
    const [updatedBlog, setUpdatedBlog] = useState(blog);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedBlog({ ...updatedBlog, [name]: value });
    };

    const handleQuillChange = (value) => {
        setUpdatedBlog({ ...updatedBlog, detailBlog: value });
    };

    const handleSubmit = () => {
        handleUpdate(updatedBlog);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        name="title"
                        value={updatedBlog.title}
                        onChange={handleChange}
                        style={{resize: 'none'}}
                    />
                </Form.Group>
                <Form.Group controlId="shortDesc">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="shortDesc"
                        value={updatedBlog.shortDesc}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        name="image"
                        value={updatedBlog.image}
                        onChange={handleChange}
                        style={{resize: 'none'}}
                    />
                </Form.Group>
                <Form.Group controlId="detailBlog">
                    <Form.Label>Detailed Blog</Form.Label>
                    <ReactQuill
                        value={updatedBlog.detailBlog}
                        onChange={handleQuillChange}
                    />
                </Form.Group>
                <Form.Group controlId="productID">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="productID"
                        value={updatedBlog.productID}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateBlog;
