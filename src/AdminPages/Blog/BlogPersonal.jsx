import React from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogPersonal = ({ show, handleClose, blog }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{blog.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="shortDesc">
                    <Form.Label>Short Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        style={{
                            border: '1px solid #ced4da',
                            padding: '10px',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            resize: 'none'
                        }}
                        readOnly
                        plaintext
                        defaultValue={blog.shortDesc}
                    />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    {blog.image ? (
                        <Image src={blog.image} alt={blog.title} fluid />
                    ) : (
                        <p>No Image</p>
                    )}
                </Form.Group>
                <Form.Group controlId="detailBlog">
                    <Form.Label>Detailed Blog</Form.Label>
                    <ReactQuill value={blog.detailBlog} readOnly />
                </Form.Group>
                <Form.Group controlId="productID">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={blog.productID} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BlogPersonal;
